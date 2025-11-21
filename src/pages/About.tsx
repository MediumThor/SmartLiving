import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import './Page.css';

const About = () => {
  const [headshotUrl, setHeadshotUrl] = useState<string>('/b71621_b470c1b9ebf6400eac8a60817fb5682a~mv2.avif');

  useEffect(() => {
    const loadHeadshot = async () => {
      try {
        const docRef = doc(db, 'headshots', 'main');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data() as { url?: string };
          if (data.url && data.url.trim()) {
            setHeadshotUrl(data.url.trim());
          }
        }
      } catch (error) {
        console.error('Error loading headshot for About page:', error);
      }
    };

    loadHeadshot();

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
      {/* Parallax Hero Section */}
      <section className="parallax-hero">
        <div 
          className="parallax-hero-image parallax" 
          data-speed="0.4"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="parallax-overlay">
            <h1>About Me</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            Welcome to my personal website. Here you'll learn about my journey, my passions, 
            and my commitment to Smart Living.
          </p>
        </div>

        <div className="about-headshot">
          <img src={headshotUrl} alt="Headshot" />
        </div>

        {/* Three Column Section */}
        <div className="three-column-section">
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Leadership" 
              />
            </div>
            <h2>My Journey</h2>
            <p>
              Through years of experience in leadership, wellness, and sailing, I've developed 
              a philosophy of Smart Living that encompasses all aspects of a fulfilling life.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Smart Living" 
              />
            </div>
            <h2>Smart Living Philosophy</h2>
            <p>
              Smart Living is about making intentional choices that enhance your quality of life. 
              It's about finding balance between work and play, health and indulgence.
            </p>
          </div>
          <div className="column-card">
            <div className="column-image">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Resources" 
              />
            </div>
            <h2>What You'll Find</h2>
            <p>
              Explore wellness resources, leadership principles, sailing adventures, and curated 
              tools to support your journey toward Smart Living.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>My Commitment</h2>
          <p>
            I'm excited to connect with you and share more about how Smart Living can enhance 
            your life. Feel free to reach out through the contact form or explore the various 
            sections of this site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

