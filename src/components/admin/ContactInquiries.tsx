import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './CharterManagement.css';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: any;
  status?: 'new' | 'read';
}

const ContactInquiries = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const contactsRef = collection(db, 'contactMessages');
        const contactsQuery = query(contactsRef, orderBy('createdAt', 'desc'));
        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsData = contactsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ContactMessage[];
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching contact inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  if (loading) {
    return <div className="loading">Loading contact inquiries...</div>;
  }

  return (
    <div className="charter-management">
      <div className="section-header">
        <h2>Contact Inquiries</h2>
      </div>

      <div className="registrations-section">
        {contacts.length === 0 ? (
          <div className="empty-state">
            <p>No contact inquiries yet.</p>
          </div>
        ) : (
          <div className="registrations-list">
            {contacts.map(contact => (
              <div key={contact.id} className="registration-card">
                <div className="registration-header">
                  <div>
                    <h3>{contact.name || 'Unknown Contact'}</h3>
                    <p className="registration-email">{contact.email}</p>
                  </div>
                  <div className="status-badge-container">
                    <span className="status-badge status-new">
                      {contact.status === 'read' ? 'Read' : 'New'}
                    </span>
                  </div>
                </div>
                <div className="registration-details">
                  <p><strong>Subject:</strong> {contact.subject}</p>
                  {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                  <p>
                    <strong>Received:</strong>{' '}
                    {contact.createdAt?.toDate
                      ? new Date(contact.createdAt.toDate()).toLocaleString()
                      : 'N/A'}
                  </p>
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    <strong>Message:</strong><br />
                    {contact.message}
                  </p>
                </div>
                <div className="registration-actions">
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
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
    </div>
  );
};

export default ContactInquiries;


