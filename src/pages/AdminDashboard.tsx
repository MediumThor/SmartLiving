import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import BlogManagement from '../components/admin/BlogManagement';
import ImageLibrary from '../components/admin/ImageLibrary';
import CharterManagement from '../components/admin/CharterManagement';
import ContactInquiries from '../components/admin/ContactInquiries';
import LessonInquiries from '../components/admin/LessonInquiries';
import './AdminDashboard.css';

type TabType = 'blogs' | 'images' | 'content' | 'charters' | 'inquiries' | 'lessons';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('charters');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [newInquiryCounts, setNewInquiryCounts] = useState({
    contacts: 0,
    lessons: 0,
    charters: 0,
  });
  const [attnInquiryCounts, setAttnInquiryCounts] = useState({
    contacts: 0,
    lessons: 0,
    charters: 0,
  });

  useEffect(() => {
    // Set up real-time listeners for new inquiry counts
    const contactsRef = collection(db, 'contactMessages');
    const contactsNewQuery = query(contactsRef, where('status', '==', 'new'));
    const contactsAttnQuery = query(contactsRef, where('status', '==', 'attn'));
    
    const lessonsRef = collection(db, 'lessonInquiries');
    const lessonsNewQuery = query(lessonsRef, where('status', '==', 'new'));
    const lessonsAttnQuery = query(lessonsRef, where('status', '==', 'attn'));
    
    const chartersRef = collection(db, 'charterInquiries');
    const chartersNewQuery = query(chartersRef, where('status', '==', 'new'));
    const chartersAttnQuery = query(chartersRef, where('status', '==', 'attn'));

    // Real-time listener for new contact messages
    const unsubscribeContactsNew = onSnapshot(
      contactsNewQuery,
      (snapshot) => {
        setNewInquiryCounts(prev => ({
          ...prev,
          contacts: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error listening to contact messages:', error);
      }
    );

    // Real-time listener for attn contact messages
    const unsubscribeContactsAttn = onSnapshot(
      contactsAttnQuery,
      (snapshot) => {
        setAttnInquiryCounts(prev => ({
          ...prev,
          contacts: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error listening to attn contact messages:', error);
      }
    );

    // Real-time listener for new lesson inquiries
    const unsubscribeLessonsNew = onSnapshot(
      lessonsNewQuery,
      (snapshot) => {
        setNewInquiryCounts(prev => ({
          ...prev,
          lessons: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error listening to lesson inquiries:', error);
      }
    );

    // Real-time listener for attn lesson inquiries
    const unsubscribeLessonsAttn = onSnapshot(
      lessonsAttnQuery,
      (snapshot) => {
        setAttnInquiryCounts(prev => ({
          ...prev,
          lessons: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error listening to attn lesson inquiries:', error);
      }
    );

    // Real-time listener for new charter inquiries
    const unsubscribeChartersNew = onSnapshot(
      chartersNewQuery,
      (snapshot) => {
        setNewInquiryCounts(prev => ({
          ...prev,
          charters: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error listening to charter inquiries:', error);
      }
    );

    // Real-time listener for attn charter inquiries
    const unsubscribeChartersAttn = onSnapshot(
      chartersAttnQuery,
      (snapshot) => {
        setAttnInquiryCounts(prev => ({
          ...prev,
          charters: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error listening to attn charter inquiries:', error);
      }
    );

    // Cleanup: unsubscribe from all listeners when component unmounts
    return () => {
      unsubscribeContactsNew();
      unsubscribeContactsAttn();
      unsubscribeLessonsNew();
      unsubscribeLessonsAttn();
      unsubscribeChartersNew();
      unsubscribeChartersAttn();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <span className="user-email">{currentUser?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'charters' ? 'active' : ''}`}
          onClick={() => setActiveTab('charters')}
        >
          Charters
          {newInquiryCounts.charters > 0 && (
            <span className="notification-badge">{newInquiryCounts.charters}</span>
          )}
          {attnInquiryCounts.charters > 0 && (
            <span className="notification-badge notification-badge-attn">{attnInquiryCounts.charters}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons
          {newInquiryCounts.lessons > 0 && (
            <span className="notification-badge">{newInquiryCounts.lessons}</span>
          )}
          {attnInquiryCounts.lessons > 0 && (
            <span className="notification-badge notification-badge-attn">{attnInquiryCounts.lessons}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          Inquiries
          {newInquiryCounts.contacts > 0 && (
            <span className="notification-badge">{newInquiryCounts.contacts}</span>
          )}
          {attnInquiryCounts.contacts > 0 && (
            <span className="notification-badge notification-badge-attn">{attnInquiryCounts.contacts}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Image Library
        </button>
        <button
          className={`tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          Blog Posts
        </button>
        <button
          className={`tab-button tab-button-disabled`}
          disabled
          title="Page Content editor is temporarily disabled"
        >
          Page Content
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'blogs' && <BlogManagement />}
        {activeTab === 'images' && <ImageLibrary />}
        {/* PageContentEditor kept for future use but not currently active */}
        {activeTab === 'charters' && <CharterManagement />}
        {activeTab === 'inquiries' && <ContactInquiries />}
        {activeTab === 'lessons' && <LessonInquiries />}
      </div>
    </div>
  );
};

export default AdminDashboard;
