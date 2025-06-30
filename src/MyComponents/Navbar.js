import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch, FaHeart, FaUserCircle, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle clicking outside the dropdown to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate('/');
  };

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
  <a
    href={token ? "/like" : "/login"}
    onClick={(e) => {
      if (!token) {
        e.preventDefault();
        alert("Please login to access wishlist.");
      }
    }}
  >
    <FaHeart className="icon-h" />
  </a>
</li>

        <li className="profile-icon-wrapper" ref={dropdownRef}>
          {token ? (
            <>
              <FaUserCircle className="icon-p" onClick={() => setDropdownOpen(!dropdownOpen)} />
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <p className="dropdown-name">Hi, {user?.name?.split(" ")[0] || "User"}</p>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>👤 My Profile</Link>
                  <Link to="/orders" onClick={() => setDropdownOpen(false)}>📦 My Orders</Link>
                 
                  <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" aria-label="Login"><FaUserCircle className="icon-p" /></Link>
          )}
        </li>

        <li>
  <a
    href={token ? "/cart" : "/login"}
    onClick={(e) => {
      if (!token) {
        e.preventDefault();
        alert("Please login to access cart.");
      }
    }}
  >
    <FaShoppingCart className="icon-c" />
  </a>
</li>
      </ul>
    </nav>
  );
};

export default Navbar;
