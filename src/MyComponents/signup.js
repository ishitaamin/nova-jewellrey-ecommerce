import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter an email");
    setOtpSent(true);
    alert("OTP sent to " + email);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Account created successfully!");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-image" />
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Create Account</h2>
          <form onSubmit={otpSent ? handleSignup : handleSendOtp}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!otpSent && <button type="submit" className="auth-btn">Send OTP</button>}
            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="submit" className="auth-btn">Sign Up</button>
              </>
            )}
          </form>
          <div className="auth-switch">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
