import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sailingDropdownOpen, setSailingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const navItems = [
    { path: '/', label: 'Welcome' },
    { path: '/about', label: 'About Me' },
    { path: '/leadership', label: 'Leadership' },
    { path: '/wellness', label: 'Wellness' },
    { path: '/blog', label: 'Blog & Stories' },
  ];

  const sailingSubItems = [
    { path: '/sailing', label: 'Sailing' },
    { path: '/charters', label: 'Charters' },
    { path: '/lessons', label: 'Lessons' },
    { path: '/deliveries', label: 'Deliveries' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSailingDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <li 
              ref={dropdownRef}
              className="nav-dropdown"
              onMouseEnter={() => !window.matchMedia('(max-width: 968px)').matches && setSailingDropdownOpen(true)}
              onMouseLeave={() => !window.matchMedia('(max-width: 968px)').matches && setSailingDropdownOpen(false)}
            >
              <span 
                className={`nav-dropdown-toggle ${['/sailing', '/charters', '/lessons', '/deliveries'].includes(location.pathname) ? 'active' : ''}`}
                onClick={() => window.matchMedia('(max-width: 968px)').matches && setSailingDropdownOpen(!sailingDropdownOpen)}
              >
                Sailing
              </span>
              <ul className={`nav-dropdown-menu ${sailingDropdownOpen ? 'open' : ''}`}>
                {sailingSubItems.map((item) => (
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
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

