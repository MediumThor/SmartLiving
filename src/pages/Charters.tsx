import { useEffect } from 'react';
import ImageSlideshow from '../components/ImageSlideshow';
import './Charters.css';

const Charters = () => {
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

  const slideshowImages = [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ];

  const itinerary = [
    {
      day: 'Day 0-1',
      title: 'ARRIVAL',
      date: 'MARCH 21-22',
      description: 'Arrive at the marina. You\'ll find the yacht docked and ready for your arrival. Those interested may join in on a delivery sail to get comfortable aboard before the adventure begins. Spend the night at the marina.',
    },
    {
      day: 'Day 2',
      title: 'TRAINING DAY',
      date: 'MARCH 23, 2026',
      description: 'Get familiar with the yacht\'s systems, sails, and crew. Practice sail handling, navigation, and teamwork in preparation for the week ahead.',
    },
    {
      day: 'Day 3',
      title: 'ISLAND HOPPING',
      date: 'MARCH 24, 2026',
      description: 'Set sail to your first destination. Enjoy scenic sailing, anchor in a beautiful bay, and experience the freedom of life on the water.',
    },
    {
      day: 'Day 4',
      title: 'EXPLORATION DAY',
      date: 'MARCH 25, 2026',
      description: 'A full day of exploration. Visit pristine beaches, snorkel in crystal-clear waters, and experience the local culture and cuisine.',
    },
    {
      day: 'Day 5',
      title: 'LAY DAY',
      date: 'MARCH 26, 2026',
      description: 'Relax, explore the area, or enjoy the beach. Take time to unwind and soak in the experience before continuing the journey.',
    },
    {
      day: 'Days 6-8',
      title: 'SAILING ADVENTURE',
      date: 'MARCH 27-29, 2026',
      description: 'Three days of exhilarating sailing through beautiful waters. Experience the thrill of sailing, enjoy stunning sunsets, and create lasting memories.',
    },
  ];

  return (
    <div className="charters-page">
      {/* Hero Section */}
      <section className="charters-hero">
        <div 
          className="charters-hero-image parallax" 
          data-speed="0.3"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="charters-hero-overlay">
            <div className="charters-hero-content">
              <h1>Caribbean Sailing Charters</h1>
              <h2>Experience the Adventure of a Lifetime</h2>
              <div className="charters-hero-details">
                <span>• March 22nd - 29th, 2026</span>
                <span>• 8 Days | 7 Nights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="charters-content">
        {/* Overview Section */}
        <section className="charters-section">
          <div className="section-container">
            <h2 className="section-title">Compete. Learn. Live the Sailing Life.</h2>
            <p className="section-description">
              Join us for an unforgettable hands-on sailing experience. Step aboard a performance 
              sailing yacht and become part of a real crew sailing through some of the most beautiful 
              waters in the world. This sailing adventure is ideal for sailors who want to experience 
              the thrill of sailing in a relaxed, supportive environment.
            </p>
            <p className="section-description">
              Whether you're a seasoned sailor or just beginning your journey, you'll learn valuable 
              skills, make lasting friendships, and experience the freedom that comes from life on 
              the water. These trips take on a unique personality, and we invite you to be part of 
              our community.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="charters-section pricing-section">
          <div className="section-container">
            <div className="pricing-card">
              <div className="pricing-badge">NEW</div>
              <h3 className="pricing-title">ALL INCLUSIVE PRICE PER PERSON</h3>
              <div className="pricing-amount">$2,750 USD</div>
              <div className="pricing-details">
                <p><strong>40% DUE UPON BOOKING</strong></p>
                <p>Final Payment Due 60 Days Prior to Departure</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodations Section */}
        <section className="charters-section">
          <div className="section-container">
            <h2 className="section-title">ACCOMMODATIONS</h2>
            <p className="section-description">
              All sailors may <strong>sleep aboard</strong> the yacht in shared bunks (up to 14 berths). 
              If you prefer more comfort, you're welcome to <strong>book your own hotel room</strong> at 
              the marina or nearby accommodations (at your own expense).
            </p>
            <ul className="feature-list">
              <li>8 Days / 7 Nights Aboard the Yacht</li>
              <li>Lunch is included on board</li>
              <li>All onboard accommodations (optional)</li>
              <li>Professional instruction and coaching</li>
              <li>Use of yacht and all sailing gear</li>
            </ul>
            <p className="section-note">
              Breakfast, dinners, drinks, and nightlife are on your own — enjoy the local flavor 
              of the vibrant sailing scene!
            </p>
          </div>
        </section>

        {/* Crew & Experience Section */}
        <section className="charters-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">CREW & EXPERIENCE</h2>
            <p className="section-description">
              You'll sail alongside at least two professional instructors/crew, with additional 
              support depending on the team's experience level. Everyone is encouraged to participate 
              — from trimming and navigation to helming and tactics.
            </p>
            <p className="section-description">
              <strong>No sailing experience?</strong> No problem — a mix of new and experienced 
              sailors makes the best crew. Our professional team will guide you through every aspect 
              of the journey.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="charters-section">
          <div className="section-container">
            <h2 className="section-title">KEY FEATURES</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">⛵</div>
                <h3>Performance Sailing Yacht</h3>
                <p>Experience sailing on a professionally maintained performance yacht</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎓</div>
                <h3>Professional Instruction</h3>
                <p>Learn from experienced sailors and professional instructors</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3>Hands-On Experience</h3>
                <p>Be part of the crew, not just a passenger</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏝️</div>
                <h3>Beautiful Destinations</h3>
                <p>Sail through some of the world's most beautiful waters</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌊</div>
                <h3>Full Sail Inventory</h3>
                <p>Complete sail inventory including spinnakers and racing gear</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">😊</div>
                <h3>Supportive Environment</h3>
                <p>Relaxed atmosphere perfect for learning and adventure</p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Slideshow */}
        <section className="charters-section">
          <div className="section-container">
            <ImageSlideshow images={slideshowImages} title="Sailing Adventure Gallery" />
          </div>
        </section>

        {/* Sample Itinerary Section */}
        <section className="charters-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">SAMPLE ITINERARY</h2>
            <div className="itinerary-container">
              {itinerary.map((item, index) => (
                <div key={index} className="itinerary-item">
                  <div className="itinerary-header">
                    <div className="itinerary-day">{item.day}</div>
                    <div className="itinerary-title-date">
                      <h3>{item.title}</h3>
                      <span className="itinerary-date">{item.date}</span>
                    </div>
                  </div>
                  <p className="itinerary-description">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="itinerary-note">
              <em>
                <strong>Please Note.</strong> This itinerary is meant to serve as an example, however, 
                it is important to note that the actual itinerary is subject to change due to weather 
                conditions or circumstances beyond our control.
              </em>
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="charters-section">
          <div className="section-container">
            <h2 className="section-title">FAQs</h2>
            <div className="faq-container">
              <div className="faq-item">
                <h3 className="faq-question">Deposit schedule / Cancellation policy</h3>
                <div className="faq-answer">
                  <p><strong>DEPOSIT DUE UPON BOOKING:</strong> $1,100</p>
                  <p><strong>FINAL BALANCE DUE:</strong> $1,650 due 60 days prior to departure</p>
                  <ul>
                    <li><strong>CANCELLATION 60+ DAYS PRIOR:</strong> Refund of all monies paid minus 50% of the initial deposit.</li>
                    <li><strong>CANCELLATION BETWEEN 30 – 60 DAYS:</strong> Refund of all monies paid minus the full deposit.</li>
                    <li><strong>CANCELLATION WITHIN THE FINAL 30 DAYS:</strong> Non-Cancellable/Non-Refundable.</li>
                  </ul>
                </div>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">How many crew members can join?</h3>
                <p className="faq-answer">We typically host 12 sailors, but can accommodate up to 14 depending on the mix of skills and experience.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Can beginners participate?</h3>
                <p className="faq-answer">Absolutely. The best teams include a mix of experienced sailors and enthusiastic beginners.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Do I have to sleep onboard?</h3>
                <p className="faq-answer">No — while all sailors have a bunk aboard, you may choose to stay at a hotel at the marina or nearby.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">What are the physical demands?</h3>
                <p className="faq-answer">This is an active experience. Teamwork and participation are part of the fun, but we accommodate all fitness levels.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Are meals included?</h3>
                <p className="faq-answer">Lunch is provided on board. Dinners, nightlife, and drinks are at your own cost.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="charters-section cta-section">
          <div className="section-container">
            <h2 className="section-title">JOIN THE ADVENTURE</h2>
            <p className="section-description">
              Experience world-class sailing, learn from professional sailors, and create memories 
              that will last a lifetime.
            </p>
            <p className="section-description">
              <strong>Spots are limited to 14 sailors — reserve your berth now.</strong>
            </p>
            <button className="cta-button">Book Your Adventure</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Charters;

