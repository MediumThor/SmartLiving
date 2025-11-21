import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import './CharterManagement.css';

interface CharterInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  charterDate: string;
  partySize: number;
  message: string;
  createdAt: any;
  status: 'new' | 'contacted' | 'form-sent' | 'completed';
}

interface CharterRegistration {
  id: string;
  inquiryId?: string;
  guestEmail: string;
  lockedFields: { [key: string]: any };
  guestData: { [key: string]: any };
  status: 'draft' | 'sent' | 'completed';
  createdAt: any;
  updatedAt: any;
  customerLinkPath?: string;
  adminSummary?: string;
}

interface CustomerSummary {
  email: string;
  name?: string;
  inquiries: CharterInquiry[];
  registrations: CharterRegistration[];
}

const CharterManagement = () => {
  const [inquiries, setInquiries] = useState<CharterInquiry[]>([]);
  const [registrations, setRegistrations] = useState<CharterRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'inquiries' | 'registrations' | 'customers'>('inquiries');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<CharterRegistration | null>(null);
  const [summaryText, setSummaryText] = useState('');
  const [savingSummary, setSavingSummary] = useState(false);
  const navigate = useNavigate();

  const getLatestCompletedRegistration = (customer: CustomerSummary): CharterRegistration | null => {
    const completed = customer.registrations.filter((reg) => {
      const hasGuestData = reg.guestData && Object.keys(reg.guestData).length > 0;
      return reg.status === 'completed' || hasGuestData;
    });

    if (completed.length === 0) return null;

    completed.sort((a, b) => {
      const aTime = a.updatedAt?.toDate ? a.updatedAt.toDate().getTime() : 0;
      const bTime = b.updatedAt?.toDate ? b.updatedAt.toDate().getTime() : 0;
      return bTime - aTime;
    });

    return completed[0];
  };

  const formatTime = (value?: string) => {
    if (!value) return 'N/A';
    // Expecting "HH:MM" from inputs; convert to 12-hour am/pm
    const [h, m] = value.split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return value;
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch inquiries
      const inquiriesRef = collection(db, 'charterInquiries');
      const inquiriesQuery = query(inquiriesRef, orderBy('createdAt', 'desc'));
      const inquiriesSnapshot = await getDocs(inquiriesQuery);
      const inquiriesData = inquiriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CharterInquiry[];

      // Fetch registrations (include all docs, even if they don't have createdAt yet)
      const registrationsRef = collection(db, 'charterRegistrations');
      const registrationsSnapshot = await getDocs(registrationsRef);
      const registrationsData = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CharterRegistration[];

      setInquiries(inquiriesData);
      setRegistrations(registrationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = (inquiryId: string) => {
    navigate(`/admin/charter-form/new?inquiryId=${inquiryId}`);
  };

  const handleEditForm = (registrationId: string) => {
    navigate(`/admin/charter-form/${registrationId}`);
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this registration form? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'charterRegistrations', id));
      setRegistrations(registrations.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Failed to delete registration form');
    }
  };

  const handleSaveSummary = async () => {
    if (!selectedRegistration) return;
    setSavingSummary(true);
    try {
      await setDoc(
        doc(db, 'charterRegistrations', selectedRegistration.id),
        { adminSummary: summaryText, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setRegistrations(prev =>
        prev.map(reg =>
          reg.id === selectedRegistration.id ? { ...reg, adminSummary: summaryText } : reg
        )
      );
      alert('Summary saved.');
    } catch (error) {
      console.error('Error saving summary:', error);
      alert('Failed to save summary.');
    } finally {
      setSavingSummary(false);
    }
  };

  // Build combined customer view keyed by email
  const customerSummaries: CustomerSummary[] = (() => {
    const map: { [email: string]: CustomerSummary } = {};

    inquiries.forEach((inq) => {
      const email = inq.email?.trim().toLowerCase();
      if (!email) return;
      if (!map[email]) {
        map[email] = {
          email,
          name: inq.name,
          inquiries: [],
          registrations: [],
        };
      }
      map[email].inquiries.push(inq);
      // Prefer first non-empty name
      if (!map[email].name && inq.name) {
        map[email].name = inq.name;
      }
    });

    registrations.forEach((reg) => {
      const email =
        reg.guestEmail?.trim().toLowerCase() ||
        (reg.lockedFields?.email && String(reg.lockedFields.email).trim().toLowerCase());
      if (!email) return;
      if (!map[email]) {
        map[email] = {
          email,
          name: reg.lockedFields?.chartererName || undefined,
          inquiries: [],
          registrations: [],
        };
      }
      map[email].registrations.push(reg);
      if (!map[email].name && reg.lockedFields?.chartererName) {
        map[email].name = reg.lockedFields.chartererName;
      }
    });

    return Object.values(map).sort((a, b) => {
      const nameA = (a.name || a.email).toLowerCase();
      const nameB = (b.name || b.email).toLowerCase();
      return nameA.localeCompare(nameB);
    });
  })();

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'charterInquiries', id));
      setInquiries(inquiries.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; class: string } } = {
      'new': { label: 'New', class: 'status-new' },
      'contacted': { label: 'Contacted', class: 'status-contacted' },
      'form-sent': { label: 'Form Sent', class: 'status-sent' },
      'completed': { label: 'Completed', class: 'status-completed' },
      'draft': { label: 'Draft', class: 'status-draft' },
      'sent': { label: 'Sent', class: 'status-sent' }
    };
    const statusInfo = statusMap[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  if (loading) {
    return <div className="loading">Loading charter data...</div>;
  }

  return (
    <div className="charter-management">
      <div className="section-header">
        <h2>Charter Management</h2>
        <button
          className="btn-refresh"
          type="button"
          onClick={fetchData}
        >
          Refresh
        </button>
        <div className="view-tabs">
          <button
            className={`view-tab ${activeView === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveView('inquiries')}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            className={`view-tab ${activeView === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveView('registrations')}
          >
            Registrations ({registrations.length})
          </button>
          <button
            className={`view-tab ${activeView === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveView('customers')}
          >
            Customers ({customerSummaries.length})
          </button>
        </div>
      </div>

      {activeView === 'inquiries' && (
        <div className="inquiries-section">
          {inquiries.length === 0 ? (
            <div className="empty-state">
              <p>No charter inquiries yet.</p>
            </div>
          ) : (
            <div className="inquiries-list">
              {inquiries.map(inquiry => (
                <div key={inquiry.id} className="inquiry-card">
                  <div className="inquiry-header">
                    <div>
                      <h3>{inquiry.name}</h3>
                      <p className="inquiry-email">{inquiry.email}</p>
                    </div>
                    {getStatusBadge(inquiry.status)}
                  </div>
                  <div className="inquiry-details">
                    <p><strong>Phone:</strong> {inquiry.phone}</p>
                    <p><strong>Charter Date:</strong> {inquiry.charterDate}</p>
                    <p><strong>Party Size:</strong> {inquiry.partySize} guests</p>
                    {inquiry.message && (
                      <p><strong>Message:</strong> {inquiry.message}</p>
                    )}
                    <p className="inquiry-date">
                      Submitted: {inquiry.createdAt?.toDate ? 
                        new Date(inquiry.createdAt.toDate()).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div className="inquiry-actions">
                    <button 
                      onClick={() => handleCreateForm(inquiry.id)}
                      className="btn-primary"
                    >
                      Create Registration Form
                    </button>
                    <button 
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeView === 'registrations' && (
        <div className="registrations-section">
          <button 
            onClick={() => navigate('/admin/charter-form/new')}
            className="btn-primary btn-new"
          >
            + New Registration Form
          </button>
          {registrations.length === 0 ? (
            <div className="empty-state">
              <p>No registration forms yet. Create one from an inquiry or start fresh.</p>
            </div>
          ) : (
            <div className="registrations-list">
              {registrations.map(reg => {
                // Treat any registration with guestData as completed, even if status didn't update
                const hasGuestData = reg.guestData && Object.keys(reg.guestData).length > 0;
                const effectiveStatus: CharterRegistration['status'] =
                  (reg.status as CharterRegistration['status']) || (hasGuestData ? 'completed' : 'draft');

                return (
                  <div key={reg.id} className="registration-card">
                    <div className="registration-header">
                      <div>
                        <h3>Registration Form</h3>
                        <p className="registration-email">{reg.guestEmail || 'No email set'}</p>
                      </div>
                      {getStatusBadge(effectiveStatus)}
                    </div>
                    <div className="registration-details">
                      <p>
                        <strong>Created:</strong> {reg.createdAt?.toDate ? 
                          new Date(reg.createdAt.toDate()).toLocaleString() : 'N/A'}
                      </p>
                      {reg.updatedAt && (
                        <p>
                          <strong>Updated:</strong> {reg.updatedAt?.toDate ? 
                            new Date(reg.updatedAt.toDate()).toLocaleString() : 'N/A'}
                        </p>
                      )}
                    </div>
                    <div className="registration-details">
                      {reg.lockedFields && (
                        <div className="locked-fields-preview">
                          <p><strong>Charter Date:</strong> {reg.lockedFields.charterDate || reg.lockedFields.charterFromDate || 'Not set'}</p>
                          <p><strong>Start Time:</strong> {formatTime(reg.lockedFields.startTime || reg.lockedFields.charterFromTime)}</p>
                          {reg.lockedFields.chartererName && (
                            <p><strong>Guest:</strong> {reg.lockedFields.chartererName}</p>
                          )}
                          {reg.customerLinkPath && (
                            <p style={{ fontSize: '0.85rem', color: '#555' }}>
                              <strong>Customer Link:</strong> {reg.customerLinkPath}
                            </p>
                          )}
                        </div>
                      )}
                      {hasGuestData && (
                        <div className="completed-form-preview" style={{
                          background: '#f0f7ff',
                          border: '2px solid #4CAF50',
                          borderRadius: '8px',
                          padding: '12px',
                          marginTop: '12px'
                        }}>
                          <p style={{ marginTop: 0, color: '#4CAF50', fontWeight: 'bold' }}>
                            ✅ Form Completed - Click "View Full Details" to see all guest information
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                            {reg.guestData.fullName && (
                              <p><strong>Guest Name:</strong> {reg.guestData.fullName}</p>
                            )}
                            {reg.guestData.phone && (
                              <p><strong>Phone:</strong> {reg.guestData.phone}</p>
                            )}
                            {reg.guestData.experience && (
                              <p><strong>Sailing Experience:</strong> {reg.guestData.experience}</p>
                            )}
                            {reg.guestData.allergies && (
                              <p><strong>Allergies:</strong> {reg.guestData.allergies}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="registration-actions">
                      <button 
                        onClick={() => {
                          setSelectedRegistration(reg);
                          const locked = reg.lockedFields || {};
                          const guest = reg.guestData || {};
                          setSummaryText(
                            reg.adminSummary ||
                            `Charter for ${guest.fullName || locked.chartererName || 'Guest'} on ` +
                            `${locked.charterDate || locked.charterFromDate || 'N/A'} ` +
                            `(${locked.charterType || 'Charter'}) with ${locked.partySize || guest.partySize || 1} guests.`
                          );
                        }}
                        className="btn-view"
                      >
                        View Full Details
                      </button>
                      <button 
                        onClick={() => handleEditForm(reg.id)}
                        className="btn-edit"
                      >
                        Edit Form
                      </button>
                      <button
                        onClick={() => handleDeleteRegistration(reg.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}


      {activeView === 'customers' && (
        <div className="registrations-section">
          {customerSummaries.length === 0 ? (
            <div className="empty-state">
              <p>No customers yet. Customers will appear here once you receive inquiries or registrations.</p>
            </div>
          ) : (
            <div className="registrations-list">
              {customerSummaries.map((customer) => {
                const totalInquiries = customer.inquiries.length;
                const totalRegistrations = customer.registrations.length;
                const completedRegistrations = customer.registrations.filter(
                  (reg) => (reg.status === 'completed') || (reg.guestData && Object.keys(reg.guestData).length > 0)
                );

                return (
                  <div key={customer.email} className="registration-card">
                    <div className="registration-header">
                      <div>
                        <h3>{customer.name || 'Unknown Customer'}</h3>
                        <p className="registration-email">{customer.email}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                          <strong>Inquiries:</strong> {totalInquiries} &nbsp;|&nbsp;
                          <strong>Registrations:</strong> {totalRegistrations} &nbsp;|&nbsp;
                          <strong>Completed:</strong> {completedRegistrations.length}
                        </p>
                      </div>
                    </div>
                    <div className="registration-details">
                      {customer.inquiries[0] && (
                        <p>
                          <strong>Latest Inquiry Date:</strong>{' '}
                          {customer.inquiries[0].createdAt?.toDate
                            ? new Date(customer.inquiries[0].createdAt.toDate()).toLocaleString()
                            : 'N/A'}
                        </p>
                      )}
                      {customer.registrations[0] && (
                        <p>
                          <strong>Latest Registration Updated:</strong>{' '}
                          {customer.registrations[0].updatedAt?.toDate
                            ? new Date(customer.registrations[0].updatedAt.toDate()).toLocaleString()
                            : 'N/A'}
                        </p>
                      )}
                    </div>
                    <div className="registration-actions">
                      <button
                        className="btn-primary"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        View Customer Timeline
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {selectedCustomer && (
        <>
          <div className="cm-modal-backdrop" onClick={() => setSelectedCustomer(null)} />
          <div className="cm-modal">
            <div className="cm-modal-header">
              <h3>Customer Details</h3>
              <button
                className="cm-modal-close"
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>
            </div>
            <div className="cm-modal-body">
              <div className="cm-modal-section">
                <h4>Customer</h4>
                <p><strong>Name:</strong> {selectedCustomer.name || 'Unknown'}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
              </div>

              {/* Latest completed registration summary */}
              {(() => {
                const latest = getLatestCompletedRegistration(selectedCustomer);
                if (!latest) return null;

                const locked = latest.lockedFields || {};
                const guest = latest.guestData || {};

                return (
                  <div className="cm-modal-section cm-summary-section">
                    <h4>Latest Completed Registration Summary</h4>
                    <div className="cm-summary-grid">
                      <div className="cm-summary-block">
                        <h5>Charter Details</h5>
                        <p><strong>Charter Type:</strong> {locked.charterType || 'N/A'}</p>
                        <p><strong>Date:</strong> {locked.charterDate || locked.charterFromDate || 'N/A'}</p>
                        <p><strong>Start Time:</strong> {formatTime(locked.startTime || locked.charterFromTime)}</p>
                        {locked.totalAmount !== undefined && (
                          <p><strong>Total Amount:</strong> ${locked.totalAmount}</p>
                        )}
                        {locked.depositDue !== undefined && (
                          <p><strong>Deposit Due:</strong> ${locked.depositDue}</p>
                        )}
                        {locked.partySize && (
                          <p><strong>Party Size:</strong> {locked.partySize}</p>
                        )}
                      </div>

                      <div className="cm-summary-block">
                        <h5>Lead Guest</h5>
                        <p><strong>Name:</strong> {guest.fullName || locked.chartererName || 'N/A'}</p>
                        <p><strong>Email:</strong> {guest.email || locked.email || selectedCustomer.email}</p>
                        {guest.phone && <p><strong>Phone:</strong> {guest.phone}</p>}
                        {guest.address && <p><strong>Address:</strong> {guest.address}</p>}
                      </div>

                      <div className="cm-summary-block">
                        <h5>Additional Guests</h5>
                        {Array.isArray(guest.guests) && guest.guests.filter(Boolean).length > 0 ? (
                          <ul className="cm-summary-list">
                            {guest.guests.filter(Boolean).map((g: string, idx: number) => (
                              <li key={idx}>{g}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No additional guests listed.</p>
                        )}
                      </div>

                      <div className="cm-summary-block">
                        <h5>Health & Safety</h5>
                        {guest.allergies && <p><strong>Allergies:</strong> {guest.allergies}</p>}
                        {guest.medical && <p><strong>Medical Notes:</strong> {guest.medical}</p>}
                        {(guest.emgName || guest.emgPhone || guest.emgRelation) && (
                          <p>
                            <strong>Emergency Contact:</strong>{' '}
                            {[guest.emgName, guest.emgRelation, guest.emgPhone].filter(Boolean).join(' • ')}
                          </p>
                        )}
                      </div>

                      <div className="cm-summary-block">
                        <h5>Experience & Preferences</h5>
                        {guest.experience && <p><strong>Experience:</strong> {guest.experience}</p>}
                        {guest.lifejackets && <p><strong>Lifejackets:</strong> {guest.lifejackets}</p>}
                        {typeof guest.nonSlip === 'boolean' && (
                          <p><strong>Non-slip shoes:</strong> {guest.nonSlip ? 'Yes' : 'No'}</p>
                        )}
                      </div>

                      <div className="cm-summary-block">
                        <h5>Agreements & Notes</h5>
                        <div className="cm-summary-pills">
                          {guest.agreePolicies && <span className="cm-pill">Policies Agreed</span>}
                          {guest.agreeWaiver && <span className="cm-pill">Waiver Signed</span>}
                          {typeof guest.photoConsent === 'boolean' && (
                            <span className="cm-pill">
                              Photo Consent: {guest.photoConsent ? 'Yes' : 'No'}
                            </span>
                          )}
                        </div>
                        {guest.notes && (
                          <p style={{ marginTop: '0.5rem' }}>
                            <strong>Additional Notes:</strong> {guest.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="cm-modal-section">
                <h4>Inquiries ({selectedCustomer.inquiries.length})</h4>
                {selectedCustomer.inquiries.length === 0 ? (
                  <p>No inquiries for this customer.</p>
                ) : (
                  selectedCustomer.inquiries.map((inq) => (
                    <div key={inq.id} className="cm-modal-card">
                      <p><strong>Date:</strong> {inq.createdAt?.toDate
                        ? new Date(inq.createdAt.toDate()).toLocaleString()
                        : 'N/A'}</p>
                      <p><strong>Charter Date:</strong> {inq.charterDate}</p>
                      <p><strong>Party Size:</strong> {inq.partySize}</p>
                      {inq.message && <p><strong>Message:</strong> {inq.message}</p>}
                    </div>
                  ))
                )}
              </div>

              <div className="cm-modal-section">
                <h4>Registrations ({selectedCustomer.registrations.length})</h4>
                {selectedCustomer.registrations.length === 0 ? (
                  <p>No registrations for this customer.</p>
                ) : (
                  selectedCustomer.registrations.map((reg) => {
                    const hasGuestData = reg.guestData && Object.keys(reg.guestData).length > 0;
                    const effectiveStatus: CharterRegistration['status'] =
                      (reg.status as CharterRegistration['status']) || (hasGuestData ? 'completed' : 'draft');

                    return (
                      <div key={reg.id} className="cm-modal-card">
                        <p><strong>Status:</strong> {effectiveStatus}</p>
                        <p><strong>Charter Date:</strong> {reg.lockedFields?.charterDate || reg.lockedFields?.charterFromDate || 'Not set'}</p>
                        <p><strong>Start Time:</strong> {formatTime(reg.lockedFields?.startTime || reg.lockedFields?.charterFromTime)}</p>
                        {hasGuestData && reg.guestData.fullName && (
                          <p><strong>Guest Name (submitted):</strong> {reg.guestData.fullName}</p>
                        )}
                        {reg.customerLinkPath && (
                          <p><strong>Customer Link Path:</strong> {reg.customerLinkPath}</p>
                        )}
                        <div className="cm-modal-actions">
                          <button
                            className="btn-edit"
                            onClick={() => {
                              navigate(`/admin/charter-form/${reg.id}`);
                              setSelectedCustomer(null);
                            }}
                          >
                            View Registration (Admin)
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteRegistration(reg.id)}
                          >
                            Delete Registration
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {selectedRegistration && (
        <>
          <div className="cm-modal-backdrop" onClick={() => setSelectedRegistration(null)} />
          <div className="cm-modal">
            <div className="cm-modal-header">
              <h3>Guest Submission Summary</h3>
              <button
                type="button"
                className="cm-modal-close"
                onClick={() => setSelectedRegistration(null)}
              >
                ×
              </button>
            </div>
            <div className="cm-modal-body">
              {(() => {
                const locked = selectedRegistration.lockedFields || {};
                const guest = selectedRegistration.guestData || {};
                return (
                  <>
                    <div className="cm-modal-section">
                      <h4>Charter Details</h4>
                      <p><strong>Charter Type:</strong> {locked.charterType || guest.charterType || 'N/A'}</p>
                      <p><strong>Date:</strong> {locked.charterDate || locked.charterFromDate || guest.charterDate || 'N/A'}</p>
                      <p><strong>Start Time:</strong> {formatTime(locked.startTime || locked.charterFromTime || guest.startTime)}</p>
                      <p><strong>Party Size:</strong> {locked.partySize || guest.partySize || 1}</p>
                      {locked.totalAmount !== undefined && (
                        <p><strong>Total Amount:</strong> ${locked.totalAmount}</p>
                      )}
                      {locked.depositDue !== undefined && (
                        <p><strong>Deposit Due:</strong> ${locked.depositDue}</p>
                      )}
                    </div>

                    <div className="cm-modal-section">
                      <h4>Lead Guest</h4>
                      <p><strong>Name:</strong> {guest.fullName || locked.chartererName || 'N/A'}</p>
                      <p><strong>Email:</strong> {guest.email || locked.email || selectedRegistration.guestEmail}</p>
                      {guest.phone && <p><strong>Phone:</strong> {guest.phone}</p>}
                      {guest.address && <p><strong>Address:</strong> {guest.address}</p>}
                    </div>

                    <div className="cm-modal-section">
                      <h4>Additional Guests</h4>
                      {Array.isArray(guest.guests) && guest.guests.filter(Boolean).length > 0 ? (
                        <ul className="cm-summary-list">
                          {guest.guests.filter(Boolean).map((g: string, idx: number) => (
                            <li key={idx}>{g}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No additional guests listed.</p>
                      )}
                    </div>

                    <div className="cm-modal-section">
                      <h4>Health & Safety</h4>
                      {guest.allergies && <p><strong>Allergies:</strong> {guest.allergies}</p>}
                      {guest.medical && <p><strong>Medical Notes:</strong> {guest.medical}</p>}
                      {(guest.emgName || guest.emgPhone || guest.emgRelation) && (
                        <p>
                          <strong>Emergency Contact:</strong>{' '}
                          {[guest.emgName, guest.emgRelation, guest.emgPhone].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>

                    <div className="cm-modal-section">
                      <h4>Experience & Preferences</h4>
                      {guest.experience && <p><strong>Experience:</strong> {guest.experience}</p>}
                      {guest.lifejackets && <p><strong>Lifejackets:</strong> {guest.lifejackets}</p>}
                      {typeof guest.nonSlip === 'boolean' && (
                        <p><strong>Non-slip shoes:</strong> {guest.nonSlip ? 'Yes' : 'No'}</p>
                      )}
                    </div>

                    <div className="cm-modal-section">
                      <h4>Agreements & Notes</h4>
                      <div className="cm-summary-pills">
                        {guest.agreePolicies && <span className="cm-pill">Policies Agreed</span>}
                        {guest.agreeWaiver && <span className="cm-pill">Waiver Signed</span>}
                        {typeof guest.photoConsent === 'boolean' && (
                          <span className="cm-pill">
                            Photo Consent: {guest.photoConsent ? 'Yes' : 'No'}
                          </span>
                        )}
                      </div>
                      {guest.notes && (
                        <p style={{ marginTop: '0.5rem' }}>
                          <strong>Guest Notes:</strong> {guest.notes}
                        </p>
                      )}
                    </div>

                    <div className="cm-modal-section">
                      <h4>Admin Summary (Editable)</h4>
                      <textarea
                        value={summaryText}
                        onChange={(e) => setSummaryText(e.target.value)}
                        rows={5}
                        style={{ width: '100%', fontFamily: 'inherit', fontSize: '0.95rem' }}
                      />
                      <div className="cm-modal-actions" style={{ marginTop: '0.75rem' }}>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={handleSaveSummary}
                          disabled={savingSummary}
                        >
                          {savingSummary ? 'Saving...' : 'Save Summary'}
                        </button>
                        <button
                          type="button"
                          className="btn-view"
                          onClick={() => window.print()}
                        >
                          Print Summary
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharterManagement;

