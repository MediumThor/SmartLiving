import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import ImageSlideshow from '../components/ImageSlideshow';
import CharterInquiryForm from '../components/CharterInquiryForm';
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

  const defaultSlideshowImages = [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ];

  const [slideshowImages, setSlideshowImages] = useState<string[]>(defaultSlideshowImages);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const slidesRef = collection(db, 'slideshowImages');
        const slidesQuery = query(slidesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(slidesQuery);
        const urls = snapshot.docs
          .map(doc => (doc.data().url as string) || '')
          .filter(url => !!url.trim());

        if (urls.length > 0) {
          setSlideshowImages(urls);
        } else {
          setSlideshowImages(defaultSlideshowImages);
        }
      } catch (error) {
        console.error('Error loading slideshow images:', error);
        setSlideshowImages(defaultSlideshowImages);
      } finally {
        // no-op; we always have either fetched or default images
      }
    };

    fetchSlides();
  }, []);

  const itinerary = [
    {
      day: 'Day 0 - 1',
      description: 'Arrival in at Marina. Embark on yacht and get settled in. Inventory provisions with Captain and stow. Review all accommodations onboard. Dinner out and discuss what all crew want to see/do so Captain can choose the proper anchorages for everyone to have their best experience.',
    },
    {
      day: 'Day 1 - 2',
      description: 'Breakfast onboard or ashore. Opportunity to visit the market for specialty food items needed, adult beverages and any other needs that are not in the provisions. Set sail late morning for Cooper island. Moore in picturesque cove for lunch, snorkeling, paddle boarding, etc. Depart and set sail for Marina Cay. / Scrub Island, secure overnight mooring, swimming, snorkeling, paddle boarding, etc. Dingy ashore for dinner, shopping, and sailing nightlife.',
    },
    {
      day: 'Day 2 - 3',
      description: 'Depart for south Virgin Gorda to visit The Baths. Lunch onboard, then sail to north Virgin Gorda. Secure overnight mooring, swimming, snorkeling, paddle boarding, etc. Study for ASA students. Dingy ashore for dinner, shopping, and sailing nightlife.',
    },
    {
      day: 'Day 3 - 4',
      description: 'Breakfast onboard. Depart for sail to Anagada Island. Lunch onboard or ashore. Secure overnight mooring, swimming, snorkeling, paddle boarding, etc. Study for ASA students. Dingy ashore for touring Island, shopping, dinner, and sailing nightlife.',
    },
    {
      day: 'Day 4 - 5',
      description: 'Breakfast onboard, swimming, snorkeling, paddle boarding, etc. Depart for sail to Jost Van Dyke. Secure overnight mooring, swimming, snorkeling, paddle boarding, etc. Study for ASA students. Dingy ashore for touring Island, shopping, dinner, and sailing nightlife.',
    },
    {
      day: 'Day 5 - 6',
      description: 'Breakfast aboard, Secure overnight mooring, swimming, snorkeling, paddle boarding, etc. Depart for Norman Island. Secure overnight mooring, swimming, snorkeling, paddle boarding, etc. Study for ASA students. Dingy ashore for touring Island, shopping, dinner, and sailing nightlife.',
    },
    {
      day: 'Day 6',
      description: 'Breakfast aboard, swimming, snorkeling, paddle boarding, etc. Study/Testing for ASA students. Set sail for Village Cay Marina. Dock the yacht and disembark.',
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
              <h1>Sailing Charters</h1>
              <h2>Great Lakes, Caribbean, Sea of Cortex, Mediterranean Sea</h2>

              <div className="charters-hero-details">
                <span>Experience the Adventure of a Lifetime</span>
              
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
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                type="button"
                className="charters-primary-button"
                onClick={() => {
                  const el = document.getElementById('charter-inquiry');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Inquire About This Charter
              </button>
            </div>
          </div>
        </section>
  {/* Image Slideshow */}
  <section className="charters-section">
          <div className="section-container">
            {slideshowImages.length > 0 && (
              <ImageSlideshow images={slideshowImages} title="Sailing Adventure Gallery" />
            )}
          </div>
        </section>
        {/* Pricing Section */}
        <section className="charters-section pricing-section">
          <div className="section-container">
            <div className="pricing-card">
              <div className="pricing-badge">NEW</div>
              <h3 className="pricing-title">ALL INCLUSIVE PRICE PER PERSON</h3>
              <div className="pricing-amount">$2,400 USD</div>
              <div className="pricing-details">
                                <p>Double Occupancy</p>

                <p><strong>40% DUE UPON BOOKING</strong></p>
                <p>Final Payment Due 60 Days Prior to Departure</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accommodations Section */}
        <section className="charters-section">
          <div className="section-container">
            <h2 className="section-title">Accommodations</h2>
            <p className="section-description">
              All sailors sleep aboard the yacht in luxurious Queen cabins. Extremely comfortable beds, ample storage lockers, private head & shower. Settle and sleep aboard the night prior to your charter start.
            </p>
            <ul className="feature-list feature-list-no-check" style={{ textAlign: 'center' }}>
              <li>6 Days / 6 Nights Aboard the Yacht</li>
              <li>Breakfast & Lunch is included on board</li>
              <li>All onboard accommodations</li>
              <li>Professional instruction and coaching (optional)</li>
            </ul>
            <p className="section-note">
              Dinners out, drinks, and nightlife are on your own — enjoy the local flavor of the vibrant sailing scene!
            </p>
          </div>
        </section>

        {/* Crew & Experience Section */}
        <section className="charters-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">CREW & EXPERIENCE</h2>
            <p className="section-description">
              You'll sail alongside a USCG Captain & ASA professional instructors. Everyone is encouraged to participate — from trimming and navigation to helming and tactics.
            </p>
            <p className="section-description">
              <strong>No sailing experience?</strong> No problem — a mix of new and experienced sailors makes the best crew. Our professional team will guide you through every aspect of the journey.
            </p>
            <p className="section-description">
              Don't feel like sailing, No problem here either, Just sit back and relax, take in the sights and soak up the sun.
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
                <h3>Sail Inventory</h3>
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

      

        {/* Sample Itinerary Section */}
        <section className="charters-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">SAMPLE ITINERARY</h2>
            <div className="itinerary-container">
              {itinerary.map((item, index) => (
                <div key={index} className="itinerary-item">
                  <div className="itinerary-header">
                    <div className="itinerary-day">{item.day}</div>
                    {item.title && (
                      <div className="itinerary-title-date">
                        <h3>{item.title}</h3>
                        {item.date && <span className="itinerary-date">{item.date}</span>}
                      </div>
                    )}
                  </div>
                  <p className="itinerary-description">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="itinerary-note">
              <em>
                <strong>Please Note.</strong> This itinerary is meant to serve as an example, however, 
                it is important to note that the actual itinerary is subject to change due to guest preferences, 
                weather conditions or circumstances beyond our control.
              </em>
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="charters-section">
          <div className="section-container">
            <h2 className="section-title">DEPOSITS / CANCELLATIONS & FAQ'S</h2>
            <div className="faq-container">
              <div className="faq-item">
                <h3 className="faq-question">Deposit schedule / Cancellation policy</h3>
                <div className="faq-answer">
                  <p><strong>DEPOSIT DUE UPON BOOKING:</strong> 50%</p>
                  <p><strong>FINAL BALANCE DUE:</strong> 60 days prior to departure</p>
                  <ul>
                    <li><strong>CANCELLATION 60+ DAYS PRIOR:</strong> Written notice of intent to cancel or reschedule. Refund of all monies paid minus 50% of the initial deposit.</li>
                    <li><strong>CANCELLATION BETWEEN 30 – 60 DAYS:</strong> Refund of all monies paid minus the full deposit.</li>
                    <li><strong>CANCELLATION WITHIN THE FINAL 30 DAYS:</strong> Non-Cancellable/Non-Refundable.</li>
                  </ul>
                </div>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">How many guest can go?</h3>
                <p className="faq-answer">Our catamarans are 3 & 4 cabin configuration. I cabin is reserved for the crew and we book the other 2 or 3 double occupancy. So 4 - 6 guests.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Can I book as a single?</h3>
                <p className="faq-answer">Yes, when you book as a single, you need either pay an additional fee, (aprox 70% of double occupancy fees), or you can share a cabin with another single. We have worked out arrangements for several single configurations. Contact me before booking as a single.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Do I need to sail the boat and what are the physical demands?</h3>
                <p className="faq-answer">This is an active experience. Teamwork and participation are part of the fun, but we accommodate all fitness levels. No, you are not require to help sail unless you are taking a class during the charter.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Are meals included?</h3>
                <p className="faq-answer">Breakfast, Lunch, and drinking water is provided on board. Dinners, nightlife, and drinks are at your own cost.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section className="charters-section cta-section" id="charter-inquiry">
          <div className="section-container">
            <h2 className="section-title">INQUIRE ABOUT A CHARTER</h2>
            <p className="section-description">
              Fill out the form below to inquire about availability and pricing for your sailing adventure.
            </p>
            <CharterInquiryForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Charters;

