import { useEffect } from 'react';
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
            data-speed="0.3"
            style={{
              backgroundImage: 'url(/welcome.avif)'
            }}
          >
            <div className="image-overlay">
              <div className="hero-content">
                <h1>WELCOME</h1>
                <p className="hero-description">
                  We are happy you found us, through our site you will find the details about the facets 
                  that make up Smart Living. We hope you're educated, inspired, and drawn to our philosophy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-icon">📋</div>
            <h2>Take our Survey</h2>
            <p>You may qualify for $100 in free products</p>
            <button className="cta-button">Take Survey</button>
          </div>
          <div className="cta-card">
            <div className="cta-icon">🎥</div>
            <h2>Sign Up for Webinar</h2>
            <p>SIGN UP FOR AN UPCOMING INFORMATIONAL WEBINAR</p>
            <button className="cta-button">Sign Up</button>
          </div>
          <div className="cta-card">
            <div className="cta-icon">🌱</div>
            <h2>Steps to Healthier Living</h2>
            <p>LOOK AT STEPS TO HEALTHIER LIVING HERE</p>
            <button className="cta-button">Learn More</button>
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

