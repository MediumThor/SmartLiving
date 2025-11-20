import { useEffect } from 'react';
import './Page.css';

const Wellness = () => {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Wellness</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Wellness is at the heart of Smart Living. True wellness encompasses physical health, 
            mental clarity, emotional balance, and spiritual fulfillment. It's about making 
            choices that support your overall well-being and quality of life.
          </p>
        </div>

        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Nutrition" 
              />
            </div>
            <h2>Nutrition</h2>
            <p>
              Fuel your body with quality foods that provide energy and support optimal function. 
              Nutrition is the foundation of wellness.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Movement" 
              />
            </div>
            <h2>Movement</h2>
            <p>
              Find physical activities you enjoy and make them a regular part of your routine. 
              Movement is essential for physical and mental health.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Mindfulness" 
              />
            </div>
            <h2>Mindfulness</h2>
            <p>
              Practice being present and managing stress through meditation, breathing, or other 
              techniques that promote mental clarity.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>Holistic Approach to Health</h2>
          <p>
            Wellness isn't just about diet and exercise—it's about creating a lifestyle that 
            supports your physical, mental, and emotional health. This includes nutrition, 
            physical activity, stress management, sleep, relationships, and finding purpose 
            and meaning in your daily life.
          </p>
        </div>

        <div className="content-section">
          <h2>Products and Resources</h2>
          <p>
            Through my journey with Smart Living, I've discovered products and resources that 
            support wellness goals. <strong>Take our Survey</strong>—you may qualify for $100 in 
            free products that support your wellness journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wellness;

