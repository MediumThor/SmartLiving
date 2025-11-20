import { useEffect } from 'react';
import './Page.css';

const Leadership = () => {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Leadership</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Leadership is a cornerstone of Smart Living. Effective leadership isn't just about 
            managing others—it's about inspiring growth, fostering collaboration, and creating 
            environments where people can thrive.
          </p>
        </div>

        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Lead by Example" 
              />
            </div>
            <h2>Lead by Example</h2>
            <p>
              Actions speak louder than words. The most effective leaders demonstrate the values 
              and behaviors they expect from others.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Empower Others" 
              />
            </div>
            <h2>Empower Others</h2>
            <p>
              Great leaders create opportunities for others to grow, take ownership, and contribute 
              meaningfully to shared goals.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Foster Collaboration" 
              />
            </div>
            <h2>Foster Collaboration</h2>
            <p>
              The best results come from teams working together toward shared goals with clear 
              communication and trust.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>My Leadership Philosophy</h2>
          <p>
            True leadership is about service, vision, and empowerment. It's about setting a 
            clear direction while giving others the tools and autonomy they need to succeed. 
            The best leaders are those who develop other leaders, creating a culture of 
            continuous improvement and shared success.
          </p>
        </div>

        <div className="content-section">
          <h2>Developing Leadership Skills</h2>
          <p>
            Leadership is a journey, not a destination. It requires continuous learning, 
            self-reflection, and a willingness to adapt. Whether you're leading a team, 
            a project, or simply leading your own life with intention, the principles of 
            effective leadership apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leadership;

