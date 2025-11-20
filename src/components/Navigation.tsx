import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: '/', label: 'Welcome' },
    { path: '/about', label: 'About Me' },
    { path: '/sailing', label: 'Sailing' },
    { path: '/charters', label: 'Charters' },
    { path: '/leadership', label: 'Leadership' },
    { path: '/wellness', label: 'Wellness' },
    { path: '/connect', label: "Let's Connect" },
    { path: '/blog', label: 'Blog & Stories' },
    { path: '/resources', label: 'Resources' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navigation ${scrolled ? 'navigation-scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/logo.avif" alt="Smart Living Logo" className="logo-img" />
          </Link>
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="menu-backdrop" onClick={closeMenu}></div>
      )}
    </>
  );
};

export default Navigation;

