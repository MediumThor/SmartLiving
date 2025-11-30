import { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import './Page.css';

const Deliveries = () => {
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
    <div className="page-container">
      <section className="parallax-hero">
        <div 
          className="parallax-hero-image parallax" 
          data-speed="0.4"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Boat Deliveries</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Professional boat delivery services for sailboats and powerboats. Whether you're 
            moving your vessel to a new home port, need transport for a charter, or require 
            delivery for a purchase, I provide safe, reliable, and experienced delivery services.
          </p>
        </div>

        <div className="content-section">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Deliveries;

