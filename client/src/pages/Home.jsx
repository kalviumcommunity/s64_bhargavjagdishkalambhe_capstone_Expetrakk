import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate('/login');

  return (
    <>
      
      <main className="home-main">
        <Hero goToLogin={goToLogin} />
        <Stats />
        <Features />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
};

const Hero = ({ goToLogin }) => (
  <section className="hero">
    <h1>Transform Your Financial Management</h1>
    <p>Join over 50,000 users who trust Expetrak...</p>
    <div className="hero-buttons">
      <button className="primary" onClick={goToLogin}>Get Started</button>
      <button className="secondary">Watch Demo</button>
    </div>
  </section>
);

const Stats = () => (
  <section className="stats-row">
    <StatCard label="Active Users" value="50,000+" growth="+12%" />
    <StatCard label="Transactions" value="$2.4M" growth="+8%" />
    <StatCard label="Customer Rating" value="4.9/5" growth="+0.3" />
  </section>
);

const StatCard = ({ label, value, growth }) => (
  <div className="stat-card">
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value} <span className="stat-growth positive">{growth}</span></span>
  </div>
);

const Features = () => (
  <section className="features-row">
    <FeatureCard img="/realtime analytics.jpg" title="Smart Budgeting" desc="AI-powered expense tracking..." />
    <FeatureCard img="/smart budgetting.png" title="Real-time Analytics" desc="Detailed insights into your spending..." />
    <FeatureCard img="/GOAL (1).png" title="Goal Setting" desc="Set and track your financial goals..." />
  </section>
);

const FeatureCard = ({ img, title, desc }) => (
  <div className="feature-card">
    <img src={img} alt={title} />
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

const Testimonials = () => (
  <section className="testimonials-section">
    <h2>What Our Users Say</h2>
    <div className="testimonials-row">
      <TestimonialCard img="/samragyi.png" name="Samragyi" role="Owner" text="Transformed my business..." />
      <TestimonialCard img="/Alok.png" name="Alok" role="Freelancer" text="The best financial tracking..." />
      <TestimonialCard img="/harsh singh.png" name="Harsh" role="Student" text="Helped me save 30% more..." />
    </div>
  </section>
);

const TestimonialCard = ({ img, name, role, text }) => (
  <div className="testimonial-card">
    <img src={img} alt={name} />
    <div>
      <strong>{name}</strong>
      <div className="testimonial-role">{role}</div>
      <div>{text}</div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div><h5>Company</h5><ul><li>About</li><li>Careers</li><li>Press</li></ul></div>
      <div><h5>Product</h5><ul><li>Features</li><li>Pricing</li><li>Security</li></ul></div>
      <div><h5>Resources</h5><ul><li>Blog</li><li>Help</li><li>Contact</li></ul></div>
      <div><h5>Legal</h5><ul><li>Privacy</li><li>Terms</li><li>Cookie</li></ul></div>
    </div>
    <div className="footer-bottom">
      <span>© 2024 Expetrak. All rights reserved.</span>
      <div className="footer-socials">
        <a href="#">Twitter</a><a href="#">LinkedIn</a><a href="#">Facebook</a>
      </div>
    </div>
  </footer>
);

export default Home;
