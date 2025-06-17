import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Ensure styles are added here
import { FaSearch, FaHeart, FaUserCircle, FaShoppingCart } from 'react-icons/fa'; 

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Nova</Link>
      </div>
      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/shop' ? 'active' : ''}>
          <Link to="/shop">Shop By</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact">Contact</Link>
        </li>
    
        <li>
          <Link to="/" aria-label="Search"><FaSearch className="icon-s" /></Link>
        </li>
        <li>
          <Link to="/like" aria-label="Wishlist"><FaHeart className="icon-h" /></Link>
        </li>
        <li>
          <Link to="/profile" aria-label="Profile"><FaUserCircle className="icon-p" /></Link>
        </li>
        <li>
          <Link to="/cart" aria-label="Cart"><FaShoppingCart className="icon-c" /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
