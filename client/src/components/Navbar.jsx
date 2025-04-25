// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import CSS directly

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Group logo image and text together */}
        <Link to="/" className="logoContainer">
          <img src="/logo.png" alt="Expetrak" className="logoImage" />
          <span className="logoText">Expetrak</span>
        </Link>
     

        <div className="navLinks">
          <Link to="/dashboard" className="navLink">Dashboard</Link>
          <Link to="/features" className="navLink">Features</Link>
          <Link to="/about" className="navLink">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
