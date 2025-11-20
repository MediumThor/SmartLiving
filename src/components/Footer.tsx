import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Connect With Me</h3>
            <p>I am excited to connect with you. Fill out the contact form and I'll reach out as soon as I can.</p>
            <div className="contact-info">
              <p>
                <a href="mailto:healthywealthyandwise@briankendzor.com">
                  healthywealthyandwise@briankendzor.com
                </a>
              </p>
              <p>
                <a href="tel:414-522-1918">414-522-1918</a>
              </p>
            </div>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} by Smart Living. Proudly created with React & Vite.
            {' '}
            <Link to="/admin/login" className="admin-link" aria-label="Admin">•</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

