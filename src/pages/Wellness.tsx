import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <h1>A WHOLISTIC APPROACH TO WELLNESS</h1>
          </div>
        </div>
      </section>

      <div className="page-content">
        <div className="content-section">
          <p className="lead">
            We believe the most powerful approach to wellness is a proactive one—investing in our health before challenges arise. Acting early almost always leads to better outcomes.
          </p>
          <p>
            That's why, at SMART LIVING, we partner exclusively with top-tier companies that prioritize customer well-being over shareholder profits. One of the most exceptional partners we recommend is The Wellness Company—a remarkable shopping club with a structure similar to Costco or Amazon, but with one crucial difference: their unwavering focus on customer health and safety. With a proven 40-year track record, their commitment speaks louder than any marketing claim.
          </p>
          <p>
            My family have been loyal members for more than a decade, and our own health and wellness results speak for themselves.
        </p>
        <p>
            When we introduce this club to friends, family, and new acquaintances, we focus on three simple questions:
          </p>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li>What is the club all about?</li>
            <li>Why is it so much safer and healthier than traditional shopping options?</li>
            <li>Is it the right fit for you?</li>
          </ol>
          <p>
            Below you'll find some key highlights. On the contact form, you'll also have the option to:
          </p>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li>Request a short survey to determine whether the club is a good match for your family—and receive $100 in free products if you qualify.</li>
            <li>Schedule an overview of the club in whichever format fits your schedule best.</li>
          </ol>
        </div>

  

        <div className="content-section">
          <h2 style={{ textAlign: 'center' }}>Our Product Isles</h2>

            <div className="three-column-section">
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Control Your Time" 
                />
              </div>
              <h2>CONTROL YOUR TIME = FREEDOM</h2>
              <p>
                Most people lack the time to accomplish what they want with their lives. Time freedom means you control your life and decide where you spend your time. For me, it allows me to have control and put my family first. We define control as having enough resources to be able to choose not only how we spend our time, but whom we spend our time with. Where we live, what schools our children attend, and where we vacation. It means deciding when you work, where you work, and whom you work with. It all boils down to having the resources to do what you want when you want to do it. 'Repeat Income' can be that resource.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Reliability" 
                />
              </div>
              <h2>RELIABILITY</h2>
              <p>
                Reliable income. Partnering with a 38-year-old, debt-free company means I can rely on consistent support. I know the work I do today will continue to provide for me long into the future, even if I decide not to work for a while.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sustainability" 
                />
              </div>
              <h2>SUSTAINABILITY</h2>
              <ul className="feature-list">
                <li>Recession-resistant</li>
                <li>Consumables already being purchased by everyone</li>
                <li>Competitively priced</li>
                <li>An untraditional way to compete with traditional business</li>
                <li>Environmentally responsible</li>
              </ul>
            </div>
          </div>
          <div className="three-column-section">
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Special Dietary Needs" 
                />
              </div>
              <h2>SPECIAL DIETARY NEEDS</h2>
              <p>
                Products specially formulated with no soy, no artificial sweeteners, no gluten, and kosher. Finest ingredients that are delicious and healthy.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Nutrition & Weight Loss" 
                />
              </div>
              <h2>NUTRITION & WEIGHT LOSS</h2>
              <p>
    Where cutting-edge science meets the purest elements of nature. This is next-level sports nutrition—engineered to amplify every ounce of your effort. Backed by a weight-loss philosophy that helps reset your metabolism and supports transformation at the cellular level, it’s designed to help your body perform and evolve at its highest potential.              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Safer Households" 
                />
              </div>
              <h2>SAFER HOUSEHOLDS</h2>
              <p>
The environments in which we live affect almost every other area of our wellness. Keeping your home toxin-free and reducing your negative impact on the environment is critical to a healthy, wellness-centered life. 
Most household cleaning brands use harsh chemicals to eat away dirt and stains. Unfortunately, these chemicals can be hazardous to your family’s health. They can damage your lungs and get onto your skin, often leaving behind residue that lasts long after you’re finished cleaning.
              </p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="three-column-section">
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Beauty, Bath & Body" 
                />
              </div>
              <h2>BEAUTY, BATH & BODY</h2>
              <p>
                Clinically-proven, innovative, anti-aging skincare, safe cosmetics, salon-quality hair care, dental & hygiene products.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Essential Oils" 
                />
              </div>
              <h2>ESSENTIAL OILS</h2>
              <p>
                Purity-tested, quality guaranteed, incredible value compared to the competition.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Medicine Cabinet" 
                />
              </div>
              <h2>MEDICINE CABINET</h2>
              <p>
                Clinically-proven skin lotion therapy, economical first-aid, sunscreen care, acne treatment, pain & heartburn relief, cold & sinus, natural insect-repellent.
              </p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="three-column-section">
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Coffee, Tea & Drinks" 
                />
              </div>
              <h2>COFFEE, TEA & DRINKS</h2>
              <p>
                Serious about your coffee & tea or just a casual drinker, you'll love the fresh, organic and fairly sourced coffees, teas and other hot drinks here.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Healthy Snacking" 
                />
              </div>
              <h2>HEALTHY SNACKING</h2>
              <p>
                Eating healthy starts with having healthy food & snacks readily available. Here, everything you can possibly choose falls into that category. So go ahead and let your kids choose their favorites, you can't go wrong here.
              </p>
            </div>
            <div className="column-card">
              <div className="column-image">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Beef" 
                />
              </div>
              <h2>DID I MENTION WE HAVE BEEF? REALLY GOOD BEEF!</h2>
              <p>
                Check out Riverbend Ranch for premium quality beef products.
              </p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2 style={{ textAlign: 'center' }}>MARKETPLACE ADVANTAGES</h2>
          <p>
            While our store has over 400 consumable products, we can't produce everything you need. Many other services and online stores have negotiated discounts for our customers, our Marketplace has savings for anything you can think of, just for being our loyal shopper.
          </p>
        </div>

        <div className="content-section">
          <h2 style={{ textAlign: 'center' }}>Take Our Survey</h2>
          <p>
            Wondering if you use the products we sell or just how much you can save off your current budget on everyday things you buy from our store? Just take our survey may qualify for <strong>$100 in FREE products</strong>. Clicking the button bellow will take you to a request form for the survey. In the drop-down menu please select "Product survey". 
          </p>
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/connect" className="charters-cta-button">
              CLICK HERE TO TAKE OUR SURVEY
            </Link>
          </p>
        </div>

        <div className="content-section">
          <h2 style={{ textAlign: 'center' }}>Let's Connect</h2>
          <p style={{ textAlign: 'center' }}>
            <Link to="/connect" className="charters-cta-button" style={{ marginRight: '1rem' }}>
              GO TO CONTACT PAGE
            </Link>
            <Link to="https://tidycal.com/smartlivingtoday/smartlivingtoday" className="charters-cta-button">
              SIGN UP FOR AN UPCOMING INFORMATIONAL WEBINAR
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wellness;

