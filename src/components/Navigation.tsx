import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

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

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Smart Living Logo" className="logo-img" />
        </Link>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

