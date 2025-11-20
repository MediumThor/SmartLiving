import { useEffect } from 'react';
import './Page.css';

const Resources = () => {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Resources</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Here you'll find helpful resources, links, and tools to support your Smart Living journey. 
            These curated resources are designed to help you in areas of wellness, leadership, 
            personal development, and more.
          </p>
        </div>

        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Wellness Resources" 
              />
            </div>
            <h2>Wellness Resources</h2>
            <p>
              Nutrition guides, fitness resources, stress management techniques, sleep optimization, 
              and product recommendations for health and wellness.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Leadership Resources" 
              />
            </div>
            <h2>Leadership & Development</h2>
            <p>
              Leadership principles, communication resources, personal development tools, book 
              recommendations, and professional development opportunities.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sailing Resources" 
              />
            </div>
            <h2>Sailing Resources</h2>
            <p>
              Sailing education, safety resources, equipment recommendations, destination guides, 
              and community networking opportunities.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>Get Started</h2>
          <p>
            <strong>Take our Survey</strong> to see if you qualify for $100 in free products 
            that support your wellness journey.
          </p>
          <p>
            <strong>Sign Up for a Webinar</strong> to learn more about Smart Living and get 
            access to exclusive resources and information.
          </p>
          <p>
            <strong>Explore Steps to Healthier Living</strong> for a comprehensive guide to 
            improving your wellness and quality of life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;

