// src/pages/Signup.jsx
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Use the CSS below

const Signup = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    return errs;
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    try {
      await axios.post('http://localhost:5001/api/users', form);
      setMessage('Signup successful! Please sign in.');
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => onSwitchToLogin && onSwitchToLogin(), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await axios.post('http://localhost:5001/api/auth/google', {
        credential: credentialResponse.credential,
      });
      navigate('/dashboard');
    } catch {
      setMessage('Google signup failed.');
    }
  };

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Welcome to Expetrak</h1>
      <p className="auth-subtitle">Create an account to get started</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <div className="error-text">{errors.name}</div>}
        <label>Email</label>
        <input
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <div className="error-text">{errors.email}</div>}
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <div className="error-text">{errors.password}</div>}
        <button type="submit" className="auth-btn">Create Account</button>
        {message && <div className="auth-message">{message}</div>}
      </form>
      <div className="auth-divider">or</div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setMessage('Google signup failed.')}
        theme="filled_blue"
        size="large"
        width="100%"
      />
      <div className="auth-footer">
        Already have an account?{' '}
        <span className="auth-link" onClick={onSwitchToLogin}>sign in</span>
      </div>
    </div>
  );
};

export default Signup;
