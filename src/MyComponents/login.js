import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login attempted with " + emailOrUsername);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-image" />
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="forgot-password">
              <Link to="#">Forgot password?</Link>
            </div>
            <button type="submit" className="auth-btn">Login</button>
          </form>
          <div className="auth-switch">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
