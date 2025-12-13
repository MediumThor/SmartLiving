import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

const Sailing = () => {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const TRUNCATE_LENGTH = 300;
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
            backgroundImage: 'url(/sailing.jpg)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Sailing</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
          Sailing is one of my great passions. The water has taught me invaluable lessons about patience, teamwork, and the importance of being present in the moment. Keeping my mental health at an even keel too.
          </p>
        </div>

        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://i.imgur.com/DKe457R.jpeg" 
                alt="Sailing Freedom" 
              />
            </div>
            <div className="column-card-content">
              <h2>The Freedom of the Open Water</h2>
              {(() => {
                const fullText = "There's something uniquely liberating about being on the water, harnessing the wind, and navigating by skill and intuition. There's a special kind of freedom that comes from being on open water—feeling the wind fill the sails, reading the waves, and letting skill and intuition guide your course. Step aboard for the ultimate sailing adventure. Our charters offer immersive, hands-on sailing experiences that take you to breathtaking destinations. Be part of a true working crew, or relax and soak in some sunshine. From the Great Lakes to the Caribbean Sea, the Sea of Cortez, the Mediterranean, and beyond—your next journey starts here.";
                const isExpanded = expandedCards['freedom'];
                const displayText = isExpanded ? fullText : truncateText(fullText, TRUNCATE_LENGTH);
                
                return (
                  <>
                    <p>{displayText}</p>
                    {fullText.length > TRUNCATE_LENGTH && (
                      <button 
                        onClick={() => toggleCard('freedom')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1a73e8',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: '0.5rem 0',
                          marginTop: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        {isExpanded ? 'See Less' : 'See More'}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="column-card-button">
              <Link to="/charters" className="charters-cta-button">
                Explore Charters
              </Link>
            </div>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="/ASA.png" 
                alt="ASA Certified Instructor" 
                style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
              />
            </div>
            <div className="column-card-content">
              <h2>Lessons</h2>
              {(() => {
                const fullText = "Learn to sail with personalized instruction from an ASA certified instructor. Whether you're a complete beginner or looking to refine your skills, I offer hands-on lessons that build confidence and competence on the water.";
                const isExpanded = expandedCards['lessons'];
                const displayText = isExpanded ? fullText : truncateText(fullText, TRUNCATE_LENGTH);
                
                return (
                  <>
                    <p>{displayText}</p>
                    {fullText.length > TRUNCATE_LENGTH && (
                      <button 
                        onClick={() => toggleCard('lessons')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1a73e8',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: '0.5rem 0',
                          marginTop: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        {isExpanded ? 'See Less' : 'See More'}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="column-card-button">
              <Link to="/lessons" className="charters-cta-button">
                Learn More
              </Link>
            </div>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://i.imgur.com/tT2dazp.jpeg" 
                alt="Boat Deliveries" 
              />
            </div>
            <div className="column-card-content">
              <h2>Deliveries</h2>
              <p>
             Professional, insured boat delivery services for both sailboats and powerboats. Whether you're relocating to a new home port, transporting a vessel for charter, or arranging delivery after a purchase, I provide safe, reliable, and experienced service from start to finish.

              </p>
            </div>
            <div className="column-card-button">
              <Link to="/deliveries" className="charters-cta-button">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>Sailing and Smart Living</h2>
          <p>
           Sailing embodies many principles of Smart Living: it requires discipline and preparation, strengthens both physical and mental well-being, fosters leadership and teamwork, and delivers an unparalleled sense of freedom and adventure. Time on the water has been shown to ease stress, sharpen focus, and create a calming reset for the mind.
I’ll be sharing more sailing stories, insights, and experiences on my blog. If you’re curious about sailing or have questions, or a story to share, please reach out through the contact form.
          </p>
        </div>

        <div className="content-section">
          <p>
            I'll be sharing more sailing stories, insights, and experiences in my blog. 
            If you're interested in sailing or have questions, feel free to reach out through 
            the contact form.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sailing;

