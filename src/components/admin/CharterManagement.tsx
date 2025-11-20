import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
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
}

const CharterManagement = () => {
  const [inquiries, setInquiries] = useState<CharterInquiry[]>([]);
  const [registrations, setRegistrations] = useState<CharterRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'inquiries' | 'registrations'>('inquiries');
  const navigate = useNavigate();

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

      // Fetch registrations
      const registrationsRef = collection(db, 'charterRegistrations');
      const registrationsQuery = query(registrationsRef, orderBy('createdAt', 'desc'));
      const registrationsSnapshot = await getDocs(registrationsQuery);
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
              {registrations.map(reg => (
                <div key={reg.id} className="registration-card">
                  <div className="registration-header">
                    <div>
                      <h3>Registration Form</h3>
                      <p className="registration-email">{reg.guestEmail || 'No email set'}</p>
                    </div>
                    {getStatusBadge(reg.status)}
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
                  <div className="registration-actions">
                    <button 
                      onClick={() => handleEditForm(reg.id)}
                      className="btn-edit"
                    >
                      Edit Form
                    </button>
                    <a
                      href={`/charter-form/${reg.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view"
                    >
                      View Customer Form
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharterManagement;

