import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { LuSailboat } from 'react-icons/lu';
import { db } from '../config/firebase';
import ImageSlideshow from '../components/ImageSlideshow';
import CharterInquiryForm from '../components/CharterInquiryForm';
import './Charters.css';

interface ItineraryItem {
  day: string;
  title?: string;
  date?: string;
  description: string;
  image?: string;
}

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

  const itinerary: ItineraryItem[] = [
    {
      day: 'Day 1',
      title: 'Marina Cay',
      description: 'Following an afternoon of big boat tacking, crew over boards, maneuvering under power, sail trim, and eyeball navigation, we find our anchorage on the eastern end of Tortola. There are three choices like the one pictured here, Marina Cay. It (like all of your stops) is idyllic with a fringing barrier reef for snorkeling or just staring at calm, clear water where the bottom looks six feet away, but could be fifty.',
      image: 'https://i.imgur.com/lnm8XNK.jpeg',
    },
    {
      day: 'Day 2',
      title: 'North Sound, Virgin Gorda',
      description: 'Tuesday you will sail up to Leverick Bay located in North Sound on Virgin Gorda. Head ashore for some of the best water sports in the world or stroll through this world class resort, or stay on the boat and watch the sun go down.',
      image: 'https://i.imgur.com/KnAtYVg.png',
    },
    {
      day: 'Day 3',
      title: 'Anegada',
      description: 'Anegada is actually a sand bar on top of a reef. Its mean elevation is six or seven feet which requires solid navigational skills. Always worth the sail, Anegada is almost completely circled by reef and is surrounded by white beach. After snorkeling the reefs, long walks on the barren beach, or relaxing in a hammock under sea grape trees, you\'ll have dinner ashore at a fabulous restaurant on the beach.',
      image: 'https://i.imgur.com/u7XAaho.jpeg',
    },
    {
      day: 'Day 4',
      title: 'Cane Garden Bay',
      description: 'After a long broad reach, you will sail into Cane Garden Bay. A picture book anchorage with palm trees spotting a white sandy beach, CGB is a small beach community that one will find difficult to leave the next day.',
      image: 'https://i.imgur.com/aiuezey.jpeg',
    },
    {
      day: 'Day 5',
      title: 'Norman Island',
      description: 'The snorkeling here is tremendous, and the harbor is always flat and breezy. Whether you enjoy dancing it up on the "Willie T" (a floating bar known by countless visiting boaters) or sitting back on the boat, Norman Island will be on your list of islands to return to.',
      image: 'https://i.imgur.com/ekk7QIL.jpeg',
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
            backgroundImage: 'url(https://i.imgur.com/Ulacb57.jpeg)'
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
                            <h3 className="pricing-title">starting at</h3>

              <div className="pricing-amount">$2,400 USD</div>
              <div className="pricing-details">
                                <p>Double Occupancy</p>

            
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
                <div className="feature-icon">
                  <LuSailboat size={32} />
                </div>
                <h3>Performance Sailing Yacht</h3>
                <p>Experience sailing on a professionally maintained performance yacht</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <h3>Professional Instruction</h3>
                <p>Learn from experienced sailors and professional instructors</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Hands-On Experience</h3>
                <p>Be part of the crew, not just a passenger</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3>Beautiful Destinations</h3>
                <p>Sail through some of the world's most beautiful waters</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h18M6 8l-3 4 3 4M18 8l3 4-3 4"/>
                    <path d="M3 8v8M21 8v8"/>
                  </svg>
                </div>
                <h3>Sail Inventory</h3>
                <p>Complete sail inventory including spinnakers and racing gear</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
                  </svg>
                </div>
                <h3>Supportive Environment</h3>
                <p>Relaxed atmosphere perfect for learning and adventure</p>
              </div>
            </div>
          </div>
        </section>

      

        {/* Sample Itinerary Section */}
        <section className="charters-section itinerary-bg">
          <div className="section-container">
            <h2 className="section-title">SAMPLE ITINERARY</h2>
            <div className="itinerary-container">
              {itinerary.map((item, index) => (
                <div key={index} className={`itinerary-item ${index % 2 === 0 ? 'image-left' : 'image-right'}`}>
                  {item.image && (
                    <div className="itinerary-image">
                      <img src={item.image} alt={item.title || item.day} />
                    </div>
                  )}
                  <div className="itinerary-content">
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

