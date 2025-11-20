import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import './Home.css';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <div 
            className="hero-image parallax" 
            data-speed="0.15"
            style={{
              backgroundImage: 'url(/welcome.avif)'
            }}
          >
            <div className="image-overlay">
              <div className="hero-content">
                <p className="hero-eyebrow">Smart Living • Sailing • Leadership • Wellness</p>
                <h1>WELCOME</h1>
                <p className="hero-description">
                  Intentional living on and off the water. Explore charters, leadership coaching, and 
                  wellness experiences designed to help you live fully and thoughtfully.
                </p>
                <div className="hero-actions">
                  <Link to="/charters" className="hero-button primary">
                    Explore Charters
                  </Link>
                  <Link to="/about" className="hero-button secondary">
                    Meet Brian
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* CTA Cards Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <span className="cta-icon">⛵</span>
            <h2>Sailing Experiences</h2>
            <p>
              Join us on the water for hands-on sailing adventures, private instruction, and immersive 
              charters tailored to your crew.
            </p>
            <Link to="/sailing" className="cta-button">
              Discover Sailing
            </Link>
          </div>
          <div className="cta-card">
            <span className="cta-icon">👥</span>
            <h2>Leadership & Teams</h2>
            <p>
              Translate lessons from the helm into the boardroom. Build resilient teams and practical, 
              values-based leadership.
            </p>
            <Link to="/leadership" className="cta-button">
              Explore Leadership
            </Link>
          </div>
          <div className="cta-card">
            <span className="cta-icon">🌿</span>
            <h2>Wellness & Growth</h2>
            <p>
              Align your health, relationships, and finances with what matters most so you can live 
              healthy, wealthy, and wise.
            </p>
            <Link to="/wellness" className="cta-button">
              Visit Wellness
            </Link>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="social-section">
        <div className="social-container">
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">📘</span>
            <span>Facebook</span>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">🐦</span>
            <span>Twitter</span>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="connect">
        <div className="contact-container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;

