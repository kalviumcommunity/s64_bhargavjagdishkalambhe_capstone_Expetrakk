// src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      
      <div className="about-container">
        <h1 className="about-title">About Expetrak</h1>
        <p className="about-intro">
          We're on a mission to transform how people manage their finances through intelligent technology and intuitive design.
        </p>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Expetrak emerged from a simple idea: making financial management accessible and efficient for everyone. What started as a small team of passionate developers has grown into a global platform serving over 50,000 users.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We believe everyone deserves access to powerful financial tools. Our mission is to democratize financial management through innovative technology and user-centered design.
          </p>
        </section>

        <section className="leadership-team">
          <h2>Leadership Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="/samragyi.png" alt="Samragyi Sharma" />
              <h3>Samragyi Sharma</h3>
              <p>CEO & Co-founder</p>
            </div>
            <div className="team-member">
              <img src="/.png" alt="" />
              <h3>Michael Rodriguez</h3>
              <p>CTO</p>
            </div>
            <div className="team-member">
              <img src="/.png" alt="" />
              <h3>Emma Thompson</h3>
              <p>Chief Product Officer</p>
            </div>
          </div>
        </section>

        <section className="our-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries to create better financial solutions.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>Building trust through open communication and honest practices.</p>
            </div>
            <div className="value-card">
              <h3>User-Focused</h3>
              <p>Every decision is made with our users' needs in mind.</p>
            </div>
            <div className="value-card">
              <h3>Security</h3>
              <p>Protecting our users' data with the highest security standards.</p>
            </div>
          </div>
        </section>

        <section className="join-team">
          <h2>Join Our Team</h2>
          <p>We're always looking for talented individuals to join our mission.</p>
          <a href="#" className="view-positions">View Open Positions</a>
        </section>
      </div>
    </div>
  );
};

export default About;
