import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaBox, FaMapMarkerAlt, FaHeart,
  FaCog, FaSignOutAlt, FaVenusMars, FaBirthdayCake
} from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  const [name, setName] = useState(user.name || 'Ishita Sharma');
  const [email, setEmail] = useState(user.email || 'ishita@example.com');
  const [phone, setPhone] = useState(user.phone || '9876543210');
  const [gender, setGender] = useState(user.gender || 'Female');
  const [dob, setDob] = useState(user.dob || '2000-01-01');
  const [address, setAddress] = useState(user.address || '123, Rose Villa, Green Park, Delhi');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSave = () => {
    const updatedUser = { name, email, phone, gender, dob, address };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  return (
    <div className="account-wrapper">
      <h2 className="account-title">👤 My Account</h2>
      <div className="account-container">
        <div className="account-sidebar">
          <div className="account-avatar">
            <div className="avatar-circle">{name?.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{name}</strong>
              <p>{email}</p>
            </div>
          </div>
          <ul className="account-menu">
            <li className="active"><FaUser /> Profile</li>
            <li onClick={() => navigate("/orders")}><FaBox /> My Orders</li>
            <li><FaMapMarkerAlt /> Addresses</li>
            <li onClick={() => navigate("/like")}><FaHeart /> Wishlist</li>
            <li><FaCog /> Settings</li>
            <li onClick={handleLogout} className="logout"><FaSignOutAlt /> Logout</li>
          </ul>
        </div>

        <div className="account-content">
          <h3>📝 Profile Information</h3>
          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <label><FaVenusMars /> Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>

            <label><FaBirthdayCake /> Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

            <label><FaMapMarkerAlt /> Address</label>
            <textarea rows="3" value={address} onChange={(e) => setAddress(e.target.value)} />

            <button type="button" onClick={handleSave}>💾 Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
