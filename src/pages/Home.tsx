import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import ImageSlideshow from '../components/ImageSlideshow';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import './Home.css';

interface HomeSlide {
  id: string;
  url: string;
  name: string;
  createdAt: any;
}

const Home = () => {
  const [homeSlides, setHomeSlides] = useState<string[]>([]);
  const [loadingHomeSlides, setLoadingHomeSlides] = useState(true);

  useEffect(() => {
    // Parallax scroll
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

  useEffect(() => {
    const fetchHomeSlides = async () => {
      try {
        const slidesRef = collection(db, 'homeSlideshowImages');
        const slidesQuery = query(slidesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(slidesQuery);
        const fetched = snapshot.docs.map(doc => (doc.data() as HomeSlide).url).filter(Boolean);

        if (fetched.length > 0) {
          setHomeSlides(fetched);
        } else {
          // Fallback default images for home slideshow
          setHomeSlides([
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1518837695005-3540f27a2a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
          ]);
        }
      } catch (error) {
        console.error('Error fetching home slideshow images:', error);
        setHomeSlides([
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        ]);
      } finally {
        setLoadingHomeSlides(false);
      }
    };

    fetchHomeSlides();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <div 
            className="hero-image parallax"
            data-speed="0.2"
            style={{
              backgroundImage: 'url(/welcome.avif)'
            }}
          >
            <div className="image-overlay">
              <div className="hero-content">
                <div className="hero-logo">
                  <img src="/logo.avif" alt="Smart Living Logo" className="hero-logo-img" />
                </div>
                <p className="hero-description">
                  Intentional living on and off the water. Explore charters, leadership coaching, and 
                  wellness experiences designed to help you live fully and thoughtfully.
                </p>
                <div className="hero-actions">
                  <button
                    onClick={() => {
                      document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="hero-button primary"
                  >
                    Connect
                  </button>
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

       {/* Home Slideshow Gallery */}
       <section className="home-slideshow-section">
        <div className="home-slideshow-container">
          {loadingHomeSlides ? (
            <div className="loading">Loading gallery...</div>
          ) : (
            <ImageSlideshow images={homeSlides} title="Life On and Off the Water" />
          )}
        </div>
      </section> 

      {/* CTA Cards Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <span className="cta-icon">⛵</span>
            <h2>Sailing</h2>
            <p>
              Join us on the water for hands-on sailing adventures, private instruction, and immersive 
              charters tailored to your crew.
            </p>
            <Link to="/sailing" className="cta-button">
             Sailing
            </Link>
          </div>
          <div className="cta-card">
            <span className="cta-icon">👥</span>
            <h2>Leadership & Teams</h2>
            <p>
              Translate lessons from the helm into the boardroom. Build resilient teams and practical, 
              values-based leadership.
            </p>
            <Link to="/leadership" className="cta-button cta-button-small">
               Leadership
            </Link>
          </div>
          <div className="cta-card">
            <span className="cta-icon">🌿</span>
            <h2>Wellness & Growth</h2>
            <p>
              Align your health, relationships, and finances with what matters most so you can live 
              healthy, wealthy, and wise.
            </p>
            <Link to="/wellness" className="cta-button cta-button-small">
             Wellness
            </Link>
          </div>
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

