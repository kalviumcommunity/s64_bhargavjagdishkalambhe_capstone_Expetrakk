import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({}); // Clear previous errors

    try {
      setLoading(true); // Set loading state
      const response = await axios.post('http://localhost:5000/api/users', formData); // Updated backend URL
      setMessage('Signup successful! You can now log in.');
      setFormData({ name: '', email: '', password: '' }); // Reset form
    } catch (error) {
      // Set error message from server or default message
      setMessage('Error: ' + (error.response?.data?.message || 'Signup failed. Please try again.'));
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Signup</h1>
        {message && (
          <div className={`signup-message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;