import { useEffect } from 'react';
import './Page.css';

const Blog = () => {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="parallax-overlay">
            <h1>Blog & Stories</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Welcome to my blog. Here I share stories, insights, and updates about Smart Living, 
            wellness, leadership, sailing, and the journey of living intentionally.
          </p>
        </div>

        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sailing Stories" 
              />
            </div>
            <h2>Sailing Adventures</h2>
            <p>
              Stories from the water, lessons learned, and the freedom that comes from 
              harnessing the wind and navigating by skill.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Leadership Insights" 
              />
            </div>
            <h2>Leadership Insights</h2>
            <p>
              Principles, experiences, and reflections on what it means to lead effectively 
              and inspire growth in others.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Wellness Tips" 
              />
            </div>
            <h2>Wellness Tips</h2>
            <p>
              Resources, strategies, and insights for living a healthier, more balanced life 
              through intentional choices.
            </p>
          </div>
        </div>

        <div className="content-section">
          <div className="blog-placeholder">
            <p>Blog posts coming soon! Check back regularly for new content.</p>
            <p>
              In the meantime, feel free to explore the other sections of the site or 
              reach out through the contact form if you'd like to connect.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>Stay Connected</h2>
          <p>
            Sign up for our newsletter or follow us on social media to stay updated on new 
            blog posts, webinars, and resources. I'm excited to share this journey with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;

