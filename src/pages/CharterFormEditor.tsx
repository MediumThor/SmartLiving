import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
// Email and SMS services removed - using manual link sharing for now
import './CharterFormEditor.css';

interface CharterFormData {
  // Charter Details
  charterDate: string;
  startTime: string;
  duration: string;
  charterType: string;
  partySize: number;
  pickupLocation: string;

  // Lead Guest
  fullName: string;
  preferredName: string;
  email: string;
  phone: string;
  address: string;

  // Guests
  guests: string[];

  // Safety & Health
  allergies: string;
  medical: string;
  experience: string;
  lifejackets: string;
  nonSlip: boolean;

  // Emergency Contact
  emgName: string;
  emgPhone: string;
  emgRelation: string;

  // Charter Agreement (Captain fields - can be locked)
  agreementDateText: string;
  chartererName: string;
  companyName: string;
  yachtModel: string;
  yachtName: string;
  sleepAboard: boolean;
  sleepFromTime: string;
  sleepFromDate: string;
  charterFromTime: string;
  charterFromDate: string;
  charterToTime: string;
  charterToDate: string;
  totalNights: number;
  numInParty: number;
  paxNotes: string;
  charterFee: number;
  provisioning: number;
  nationalParksFee: number;
  cruisingPermit: number;
  fuelSurcharge: number;
  visarDonation: number;
  hotel: number;
  instructorFee: number;
  depositDue: number;
  totalAmount: number;
  balanceDue: number;
  refundableDamageDeposit: number;
  paymentNotes: string;

  // Policies & Waiver
  agreePolicies: boolean;
  agreeWaiver: boolean;
  photoConsent: boolean;

  // Signature & Notes
  signature: string;
  notes: string;
}

// Fields the owner (captain) controls that should be immutable on the customer form.
// These are stored in lockedFields and rendered read-only on the guest side.
const CAPTAIN_LOCKED_FIELDS = [
  // Charter details
  'charterDate',
  'startTime',
  'duration',
  'charterType',
  'partySize',
  'pickupLocation',

  // Lead guest / contract header (as set by the owner)
  'fullName',
  'preferredName',
  'email',
  'phone',
  'address',

  // Agreement / company / boat
  'agreementDateText',
  'chartererName',
  'companyName',
  'yachtModel',
  'yachtName',
  'sleepAboard',
  'sleepFromTime',
  'sleepFromDate',
  'charterFromTime',
  'charterFromDate',
  'charterToTime',
  'charterToDate',
  'totalNights',
  'numInParty',
  'paxNotes',

  // Pricing and payments
  'charterFee',
  'provisioning',
  'nationalParksFee',
  'cruisingPermit',
  'fuelSurcharge',
  'visarDonation',
  'hotel',
  'instructorFee',
  'depositDue',
  'totalAmount',
  'balanceDue',
  'refundableDamageDeposit',
  'paymentNotes'
];

const CharterFormEditor = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get('inquiryId');
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<CharterFormData>({
    charterDate: '',
    startTime: '',
    duration: '',
    charterType: '',
    partySize: 1,
    pickupLocation: '',
    fullName: '',
    preferredName: '',
    email: '',
    phone: '',
    address: '',
    guests: ['', '', '', ''],
    allergies: '',
    medical: '',
    experience: '',
    lifejackets: '',
    nonSlip: false,
    emgName: '',
    emgPhone: '',
    emgRelation: '',
    agreementDateText: '',
    chartererName: '',
    companyName: 'Captain Brian Kendzor',
    yachtModel: '',
    yachtName: '',
    sleepAboard: false,
    sleepFromTime: '',
    sleepFromDate: '',
    charterFromTime: '12:00',
    charterFromDate: '',
    charterToTime: '12:00',
    charterToDate: '',
    totalNights: 0,
    numInParty: 0,
    paxNotes: '',
    charterFee: 0,
    provisioning: 0,
    nationalParksFee: 0,
    cruisingPermit: 0,
    fuelSurcharge: 0,
    visarDonation: 0,
    hotel: 0,
    instructorFee: 0,
    depositDue: 0,
    totalAmount: 0,
    balanceDue: 0,
    refundableDamageDeposit: 0,
    paymentNotes: '',
    agreePolicies: false,
    agreeWaiver: false,
    photoConsent: false,
    signature: '',
    notes: ''
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'draft' | 'sent' | 'completed'>('draft');
  const [guestData, setGuestData] = useState<any>({});

  useEffect(() => {
    if (isEditing && id) {
      loadForm();
    } else if (inquiryId) {
      loadInquiry();
    } else {
      setLoading(false);
    }
  }, [id, inquiryId, isEditing]);

  useEffect(() => {
    calculateTotals();
    calculateNights();
  }, [formData.charterFee, formData.provisioning, formData.nationalParksFee, 
      formData.cruisingPermit, formData.fuelSurcharge, formData.visarDonation,
      formData.hotel, formData.instructorFee, formData.depositDue,
      formData.charterFromDate, formData.charterToDate]);

  const loadInquiry = async () => {
    try {
      const inquiryDoc = await getDoc(doc(db, 'charterInquiries', inquiryId!));
      if (inquiryDoc.exists()) {
        const data = inquiryDoc.data();
        const customerName = data.name || '';
        setFormData(prev => ({
          ...prev,
          email: data.email || '',
          phone: data.phone || '',
          fullName: customerName,
          chartererName: customerName, // Auto-populate charterer name from inquiry
          charterDate: data.charterDate || '',
          partySize: data.partySize || 1
        }));
      }
    } catch (error) {
      console.error('Error loading inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadForm = async () => {
    try {
      const formDoc = await getDoc(doc(db, 'charterRegistrations', id!));
      if (formDoc.exists()) {
        const data = formDoc.data();
        // Load locked fields into formData (these are the captain's pre-filled fields)
        const lockedData = data.lockedFields || {};
        const guestDataLoaded = data.guestData || {};
        
        console.log('Loading form - Locked fields:', lockedData); // Debug log
        console.log('Loading form - Guest data:', guestDataLoaded); // Debug log
        console.log('Loading form - Status:', data.status); // Debug log
        
        // Merge locked fields and guest data (guest data takes precedence for editable fields)
        setFormData(prev => ({
          ...prev,
          ...lockedData,
          ...guestDataLoaded // Guest data overrides locked fields where applicable
        }));
        setFormStatus(data.status || 'draft');
        setGuestData(guestDataLoaded);
      }
    } catch (error) {
      console.error('Error loading form:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (formData.charterFromDate && formData.charterToDate) {
      const from = new Date(formData.charterFromDate);
      const to = new Date(formData.charterToDate);
      const diff = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      if (!isNaN(diff) && diff >= 0) {
        setFormData(prev => ({ ...prev, totalNights: diff }));
      }
    }
  };

  const calculateTotals = () => {
    const total = 
      (formData.charterFee || 0) +
      (formData.provisioning || 0) +
      (formData.nationalParksFee || 0) +
      (formData.cruisingPermit || 0) +
      (formData.fuelSurcharge || 0) +
      (formData.visarDonation || 0) +
      (formData.hotel || 0) +
      (formData.instructorFee || 0);

    const deposit = formData.depositDue || 0;
    const balance = Math.max(total - deposit, 0);

    setFormData(prev => ({
      ...prev,
      totalAmount: total,
      balanceDue: balance
    }));
  };

  const handleChange = (field: keyof CharterFormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-sync customer name to charterer name
      if (field === 'fullName' && value) {
        updated.chartererName = value;
      }
      
      return updated;
    });
  };

  const handleNumberChange = (field: keyof CharterFormData, value: string) => {
    // Handle empty string
    if (value === '' || value === null || value === undefined) {
      handleChange(field, 0);
      return;
    }
    
    // Remove leading zeros (but keep single 0 if that's all there is)
    let cleanedValue = value.replace(/^0+(?=\d)/, '');
    if (cleanedValue === '') cleanedValue = '0';
    
    // Convert to number
    const numValue = parseFloat(cleanedValue);
    if (!isNaN(numValue)) {
      handleChange(field, numValue);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const lockedData: { [key: string]: any } = {};
      // Automatically treat captain-defined fields as locked for the customer
      CAPTAIN_LOCKED_FIELDS.forEach(field => {
        const value = formData[field as keyof CharterFormData];
        // Only include field if it has a valid value
        // Check for undefined, null, empty string, and also handle 0 for numbers
        if (value !== undefined && value !== null) {
          // For strings, check if not empty
          if (typeof value === 'string' && value.trim() !== '') {
            lockedData[field] = value.trim();
          }
          // For numbers, include even if 0 (but not undefined)
          else if (typeof value === 'number') {
            lockedData[field] = value;
          }
          // For booleans, include them
          else if (typeof value === 'boolean') {
            lockedData[field] = value;
          }
        }
      });

      const formDoc: { [key: string]: any } = {
        inquiryId: inquiryId || null,
        guestEmail: formData.email || '',
        lockedFields: lockedData,
        guestData: {},
        status: 'draft',
        updatedAt: serverTimestamp()
      };

      // Only add createdAt if creating new document
      if (!isEditing) {
        formDoc.createdAt = serverTimestamp();
      }

      if (isEditing && id) {
        await setDoc(doc(db, 'charterRegistrations', id), formDoc);
      } else {
        const newDocRef = await addDoc(collection(db, 'charterRegistrations'), formDoc);
        navigate(`/admin/charter-form/${newDocRef.id}`);
      }

      alert('Form saved successfully!');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  const handleSendToCustomer = async () => {
    if (!formData.email || !formData.email.trim()) {
      alert('Please enter the customer email address before sending.');
      return;
    }

    const confirmSend = window.confirm(
      `Send charter registration form to ${formData.email}?\n\nThis will save the form and send an email with a link to complete it.`
    );

    if (!confirmSend) return;

    setSaving(true);
    try {
      const lockedData: { [key: string]: any } = {};
      // Automatically lock captain fields for the customer copy
      CAPTAIN_LOCKED_FIELDS.forEach(field => {
        const value = formData[field as keyof CharterFormData];
        // Only include field if it has a valid value
        // Check for undefined, null, empty string, and also handle 0 for numbers
        if (value !== undefined && value !== null) {
          // For strings, check if not empty
          if (typeof value === 'string' && value.trim() !== '') {
            lockedData[field] = value.trim();
          }
          // For numbers, include even if 0 (but not undefined)
          else if (typeof value === 'number') {
            lockedData[field] = value;
          }
          // For booleans, include them
          else if (typeof value === 'boolean') {
            lockedData[field] = value;
          }
        }
      });

      const formDoc: { [key: string]: any } = {
        inquiryId: inquiryId || null,
        guestEmail: formData.email.trim() || '',
        lockedFields: lockedData,
        guestData: {},
        status: 'sent',
        updatedAt: serverTimestamp()
      };

      // Only add createdAt if creating new document
      if (!isEditing) {
        formDoc.createdAt = serverTimestamp();
      }

      let formId = id;
      if (isEditing && id) {
        await setDoc(doc(db, 'charterRegistrations', id), formDoc);
      } else {
        const newDocRef = await addDoc(collection(db, 'charterRegistrations'), formDoc);
        formId = newDocRef.id;
        navigate(`/admin/charter-form/${formId}`);
      }
      
      // Build and log the customer link so it's stored in Firestore for later reference
      if (formId) {
        const customerPath = `/charter-form/${formId}`;
        const customerLink = `${window.location.origin}${customerPath}`;

        // Persist the link path on the registration document for admin reference
        await setDoc(
          doc(db, 'charterRegistrations', formId),
          { customerLinkPath: customerPath },
          { merge: true }
        );
      
        // Show customer link for manual sending
        alert(
          `✅ Form saved successfully!\n\nCustomer Link:\n${customerLink}\n\nThis link is now logged on the registration and can be accessed later from the admin dashboard.`
        );
      } else {
        alert('Form saved, but could not determine form ID to generate customer link.');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      alert('Failed to save form. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading form...</div>;
  }

  return (
    <div className="charter-form-editor">
      <div className="editor-header">
        <h1>{isEditing ? 'Edit Charter Registration Form' : 'Create Charter Registration Form'}</h1>
        {formStatus === 'completed' && (
          <div className="completed-badge" style={{
            background: '#4CAF50',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            marginLeft: '16px'
          }}>
            ✅ Form Completed by Guest
          </div>
        )}
        <div className="header-actions">
          <button onClick={() => navigate('/admin/dashboard')} className="btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </div>
      
      {formStatus === 'completed' && (
        <div className="guest-data-summary" style={{
          background: '#f0f7ff',
          border: '2px solid #4CAF50',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginTop: 0, color: '#4CAF50' }}>✅ Guest Submission Summary</h3>
          {Object.keys(guestData).length === 0 ? (
            <p style={{ color: '#ff6b6b' }}>⚠️ No guest data found. The form may not have been submitted correctly.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
              {guestData.fullName && <p><strong>Full Name:</strong> {guestData.fullName}</p>}
              {guestData.phone && <p><strong>Phone:</strong> {guestData.phone}</p>}
              {guestData.email && <p><strong>Email:</strong> {guestData.email}</p>}
              {guestData.address && <p><strong>Address:</strong> {guestData.address}</p>}
              {guestData.charterType && <p><strong>Charter Type:</strong> {guestData.charterType}</p>}
              {guestData.experience && <p><strong>Sailing Experience:</strong> {guestData.experience}</p>}
              {guestData.lifejackets && <p><strong>Life Jacket Sizes:</strong> {guestData.lifejackets}</p>}
              {guestData.nonSlip !== undefined && <p><strong>Non-slip Shoes:</strong> {guestData.nonSlip ? 'Yes' : 'No'}</p>}
              {guestData.allergies && <p><strong>Allergies:</strong> {guestData.allergies}</p>}
              {guestData.medical && <p><strong>Medical Notes:</strong> {guestData.medical}</p>}
              {guestData.emgName && <p><strong>Emergency Contact Name:</strong> {guestData.emgName}</p>}
              {guestData.emgPhone && <p><strong>Emergency Contact Phone:</strong> {guestData.emgPhone}</p>}
              {guestData.emgRelation && <p><strong>Emergency Contact Relation:</strong> {guestData.emgRelation}</p>}
              {guestData.agreePolicies !== undefined && <p><strong>Agreed to Policies:</strong> {guestData.agreePolicies ? 'Yes' : 'No'}</p>}
              {guestData.agreeWaiver !== undefined && <p><strong>Agreed to Waiver:</strong> {guestData.agreeWaiver ? 'Yes' : 'No'}</p>}
              {guestData.photoConsent !== undefined && <p><strong>Photo Consent:</strong> {guestData.photoConsent ? 'Yes' : 'No'}</p>}
              {guestData.signature && <p><strong>Signature:</strong> {guestData.signature}</p>}
              {guestData.notes && <p><strong>Special Requests/Notes:</strong> {guestData.notes}</p>}
            </div>
          )}
          <div style={{ marginTop: '16px', padding: '12px', background: '#fff', borderRadius: '4px', fontSize: '12px', color: '#666' }}>
            <strong>Debug Info:</strong> Guest data keys: {Object.keys(guestData).join(', ') || 'None'}
          </div>
        </div>
      )}

      <div className="editor-controls">
        <p className="help-text">
          Fill in the captain fields below. Anything you enter here will be pre-filled and read-only for the customer.
        </p>
      </div>

      <form className="charter-form" onSubmit={(e) => e.preventDefault()}>
        {/* Charter Details Section */}
        <fieldset className="form-section">
          <legend>Charter Details</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Charter Date *</label>
              <input
                type="date"
                value={formData.charterDate}
                onChange={(e) => handleChange('charterDate', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 1 day, 2.5 days"
              />
            </div>
            <div className="form-group">
              <label>Charter Type *</label>
              <select
                value={formData.charterType}
                onChange={(e) => handleChange('charterType', e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option>Sunset Sail</option>
                <option>Half-Day</option>
                <option>Full-Day</option>
                <option>Private Lesson / Coaching</option>
                <option>Special Event</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Guests *</label>
              <input
                type="number"
                value={formData.partySize}
                onChange={(e) => handleChange('partySize', parseInt(e.target.value) || 1)}
                min="1"
                max="14"
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Pickup / Meeting Location</label>
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => handleChange('pickupLocation', e.target.value)}
                placeholder="Marina name, dock number, etc."
              />
            </div>
          </div>
        </fieldset>

        {/* Lead Guest Section */}
        <fieldset className="form-section">
          <legend>Lead Guest (Primary Contact)</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Preferred Name</label>
              <input
                type="text"
                value={formData.preferredName}
                onChange={(e) => handleChange('preferredName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Mailing Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        {/* Charter Agreement Section - Captain Fields */}
        <fieldset className="form-section captain-section">
          <legend>Charter Agreement (Captain Fields)</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Agreement Date *</label>
              <input
                type="text"
                value={formData.agreementDateText}
                onChange={(e) => handleChange('agreementDateText', e.target.value)}
                placeholder="e.g., 1st May 2025"
                required
              />
            </div>
            <div className="form-group">
              <label>Charterer Name *</label>
              <input
                type="text"
                value={formData.chartererName}
                onChange={(e) => handleChange('chartererName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Yacht Model *</label>
              <input
                type="text"
                value={formData.yachtModel}
                onChange={(e) => handleChange('yachtModel', e.target.value)}
                placeholder="e.g., Isla 40"
                required
              />
            </div>
            <div className="form-group">
              <label>Yacht Name *</label>
              <input
                type="text"
                value={formData.yachtName}
                onChange={(e) => handleChange('yachtName', e.target.value)}
                placeholder="e.g., Paire De Jaques"
                required
              />
            </div>
            <div className="form-group">
              <label>Charter From Date *</label>
              <input
                type="date"
                value={formData.charterFromDate}
                onChange={(e) => handleChange('charterFromDate', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Charter To Date *</label>
              <input
                type="date"
                value={formData.charterToDate}
                onChange={(e) => handleChange('charterToDate', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Charter Fee</label>
              <input
                type="number"
                step="0.01"
                value={formData.charterFee || ''}
                onChange={(e) => handleNumberChange('charterFee', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Deposit Due</label>
              <input
                type="number"
                step="0.01"
                value={formData.depositDue || ''}
                onChange={(e) => handleNumberChange('depositDue', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Total Amount (auto)</label>
              <input
                type="number"
                step="0.01"
                value={formData.totalAmount}
                readOnly
                className="readonly"
              />
            </div>
            <div className="form-group">
              <label>Balance Due (auto)</label>
              <input
                type="number"
                step="0.01"
                value={formData.balanceDue}
                readOnly
                className="readonly"
              />
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button onClick={handleSave} className="btn-save" disabled={saving}>
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={handleSendToCustomer} className="btn-send" disabled={saving}>
            {saving ? 'Saving...' : 'Save & Generate Customer Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharterFormEditor;

