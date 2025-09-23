import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Car Showroom
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/cars" 
              className={`nav-link ${isActive('/cars') ? 'active' : ''}`}
            >
              Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/showrooms" 
              className={`nav-link ${isActive('/showrooms') ? 'active' : ''}`}
            >
              Showrooms
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/admin" 
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;