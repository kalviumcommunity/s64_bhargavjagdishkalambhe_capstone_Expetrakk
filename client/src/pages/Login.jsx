import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    try {
      // Send login details to the backend
      const response = await axios.post('http://localhost:5001/api/users/login', { email, password });

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);

      setMessage('Login successful!');
      // Redirect or set auth state here
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login to Expetrak</h2>
        {message && <div className={`login-message ${message === 'Login successful!' ? 'success' : 'error'}`}>{message}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;