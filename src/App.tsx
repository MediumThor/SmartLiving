import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Sailing from './pages/Sailing';
import Charters from './pages/Charters';
import Leadership from './pages/Leadership';
import Wellness from './pages/Wellness';
import Connect from './pages/Connect';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BlogPostEditor from './pages/BlogPostEditor';
import CharterFormEditor from './pages/CharterFormEditor';
import CharterGuestForm from './pages/CharterGuestForm';
import './App.css';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <ScrollToTop />
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sailing" element={<Sailing />} />
              <Route path="/charters" element={<Charters />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/new-post"
                element={
                  <ProtectedRoute>
                    <BlogPostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-post/:id"
                element={
                  <ProtectedRoute>
                    <BlogPostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/charter-form/:id"
                element={
                  <ProtectedRoute>
                    <CharterFormEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/charter-form/new"
                element={
                  <ProtectedRoute>
                    <CharterFormEditor />
                  </ProtectedRoute>
                }
              />
              <Route path="/charter-form/:id" element={<CharterGuestForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
