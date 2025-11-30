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
            I believe in investing in health to avoid health issues rather than waiting until you're dealing with real health challenges.
          </p>
        <p>
            At SMART LIVING, we invite you to shop with us online and our 100% USA manufacture-direct store. Supporting US manufacturers means supporting American jobs, families and our US economy. It also means fresh, safe & healthy in your home. And, as you'll find out, NO one cares more about their customer than we do at The Wellness Company.
        </p>
        <p>
            <strong>Not Sure if it's Right for You?</strong> Take a quick Survey at the Bottom of This Page
          </p>
        </div>

        <div className="content-section">
          <h2>What We Have to Offer</h2>
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
        </div>

        <div className="content-section">
          <h2>Our Product Categories</h2>
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
                Cutting edge of science & the best of nature combined to give you the best vitamins, weight loss and sports nutrition, premium coffees, teas and specialty drinks.
              </p>
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
                Home fragrances, environmentally friendly, safer cleaners for your household, dish & laundry cleaners. All significantly better, safer and less than retail brands.
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
          <h2>MARKETPLACE ADVANTAGES</h2>
          <p>
            While our store has over 400 consumable products, we can't produce everything you need. Many other services and online stores have negotiated discounts for our customers, our Marketplace has savings for anything you can think of, just for being our loyal shopper.
          </p>
        </div>

        <div className="content-section">
          <h2>Take Our Survey</h2>
          <p>
            Wondering if you use the products we sell or just how much you can save off your current budget on everyday things you buy from our store? Just take our survey below—you may qualify for <strong>$100 in FREE products</strong>.
          </p>
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/connect" className="charters-cta-button">
              CLICK HERE TO TAKE OUR SURVEY
            </Link>
          </p>
        </div>

        <div className="content-section">
          <h2>Let's Connect</h2>
          <p style={{ textAlign: 'center' }}>
            <Link to="/connect" className="charters-cta-button" style={{ marginRight: '1rem' }}>
              GO TO CONTACT PAGE
            </Link>
            <Link to="/connect" className="charters-cta-button">
              SIGN UP FOR AN UPCOMING INFORMATIONAL WEBINAR
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wellness;

