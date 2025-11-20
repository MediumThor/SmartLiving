import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BlogManagement from '../components/admin/BlogManagement';
import ImageLibrary from '../components/admin/ImageLibrary';
import PageContentEditor from '../components/admin/PageContentEditor';
import CharterManagement from '../components/admin/CharterManagement';
import './AdminDashboard.css';

type TabType = 'blogs' | 'images' | 'content' | 'charters';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('blogs');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
          className={`tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          📝 Blog Posts
        </button>
        <button
          className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          🖼️ Image Library
        </button>
        <button
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          ✏️ Page Content
        </button>
        <button
          className={`tab-button ${activeTab === 'charters' ? 'active' : ''}`}
          onClick={() => setActiveTab('charters')}
        >
          ⛵ Charters
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'blogs' && <BlogManagement />}
        {activeTab === 'images' && <ImageLibrary />}
        {activeTab === 'content' && <PageContentEditor />}
        {activeTab === 'charters' && <CharterManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
