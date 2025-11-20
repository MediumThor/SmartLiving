import { useEffect } from 'react';
import './Page.css';

const Sailing = () => {
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
            Sailing is one of my great passions. The water has taught me invaluable lessons 
            about patience, teamwork, and the importance of being present in the moment.
          </p>
        </div>

        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sailing Freedom" 
              />
            </div>
            <h2>The Freedom of the Open Water</h2>
            <p>
              There's something uniquely liberating about being on the water, harnessing the 
              wind, and navigating by skill and intuition.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sailing Lessons" 
              />
            </div>
            <h2>Lessons from the Sea</h2>
            <p>
              Sailing teaches you to read conditions, adapt to change, and work as part of a team. 
              These lessons translate directly to life on land.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sailing Adventure" 
              />
            </div>
            <h2>Adventures and Experiences</h2>
            <p>
              From coastal cruises to regatta racing, each sailing experience offers new challenges 
              and rewards.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>Sailing and Smart Living</h2>
          <p>
            Sailing embodies many principles of Smart Living: it requires discipline and 
            preparation, offers physical and mental wellness benefits, demands leadership 
            and teamwork, and provides a sense of freedom and adventure.
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

