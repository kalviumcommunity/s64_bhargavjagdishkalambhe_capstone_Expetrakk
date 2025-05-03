import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../styles/AuthFlip.css';

const AuthFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (isSignup) => {
    const newErrors = {};
    if (isSignup && !formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleSubmit = async (e, isSignup) => {
    e.preventDefault();
    setMessage('');
    const formErrors = validate(isSignup);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      const endpoint = isSignup ? '/api/users' : '/api/users/login';
      const response = await axios.post(`http://localhost:5001${endpoint}`, formData);
      setMessage(isSignup ? 'Signup successful! Redirecting...' : 'Login successful! Redirecting...');
      localStorage.setItem('token', response.data.token); // Save token for login or signup
      setTimeout(() => navigate('/dashboard'), 1500); // Navigate to dashboard after success
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/google', {
        credential: credentialResponse.credential,
      });
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      setMessage('Google authentication successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500); // Navigate to dashboard after success
    } catch (error) {
      console.error('Google authentication error:', error);
      setMessage('Google authentication failed. Try again.');
    }
  };

  const handleGoogleError = () => {
    setMessage('Google authentication failed. Try again.');
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side (Login) */}
        <div className="front">
          <h2>Login</h2>
          {message && <div className={`auth-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</div>}
          <form onSubmit={(e) => handleSubmit(e, false)} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <div className="or-divider"><span>or</span></div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_blue"
            size="large"
            width="100%"
          />
          <p className="toggle-text">
            Don't have an account?{' '}
            <span className="toggle-link" onClick={() => setIsFlipped(true)}>
              Sign Up
            </span>
          </p>
        </div>

        {/* Back Side (Signup) */}
        <div className="back">
          <h2>Sign Up</h2>
          {message && <div className={`auth-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</div>}
          <form onSubmit={(e) => handleSubmit(e, true)} className="auth-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div className="or-divider"><span>or</span></div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_blue"
            size="large"
            width="100%"
          />
          <p className="toggle-text">
            Already have an account?{' '}
            <span className="toggle-link" onClick={() => setIsFlipped(false)}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFlip;