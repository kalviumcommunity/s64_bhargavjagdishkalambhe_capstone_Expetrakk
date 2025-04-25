// src/pages/Features.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Features.css';

const sidebarFeatures = [
  {
    key: 'expense',
    title: 'Expense Tracking',
    desc: 'Monitor and categorize all your expenses in one place',
    detail: {
      heading: 'Expense Tracking',
      text: 'Track every penny with our intuitive expense tracking system. Categorize, tag, and monitor your spending in real-time.',
      img: '/expetrak-feature-expense.jpg', // Replace with your image path
    },
  },
  {
    key: 'analytics',
    title: 'Smart Analytics',
    desc: 'Get detailed insights into your spending patterns',
    detail: {
      heading: 'Smart Analytics',
      text: 'Unlock powerful analytics to understand your spending and saving habits, helping you make smarter financial decisions.',
      img : '/expetrak-feature-analytics.jpg',
    },
  },
  {
    key: 'budgeting',
    title: 'Intelligent Budgeting',
    desc: 'Set smart budgets and achieve your financial goals',
    detail: {
      heading: 'Intelligent Budgeting',
      text: 'Set personalized budgets and track your progress to reach your financial targets efficiently.',
      img: '/expetrak-feature-budgeting.jpg',
    },
  },
];

const cards = [
  {
    icon: '⟳',
    title: 'Real-time Sync',
    desc: 'Your data is automatically synced across all your devices in real-time.',
  },
  {
    icon: '✅',
    title: 'Bank Integration',
    desc: 'Connect securely with your bank accounts for automated expense tracking.',
  },
  {
    icon: '⭐',
    title: 'Custom Reports',
    desc: 'Generate detailed reports tailored to your specific needs and preferences.',
  },
];

const Features = () => {
  const [active, setActive] = useState('expense');
  const activeFeature = sidebarFeatures.find(f => f.key === active);

  return (
    <div className="features-page">
    
      <div className="features-main">
        <h1>Powerful Features for Better Financial Control</h1>
        <p className="features-subhead">
          Take control of your expenses with our comprehensive suite of features designed for both personal and business use.
        </p>
        <div className="features-section">
          <aside className="features-sidebar">
            {sidebarFeatures.map(f => (
              <button
                key={f.key}
                className={`sidebar-btn${active === f.key ? ' active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                <span className="sidebar-title">{f.title}</span>
                <span className="sidebar-desc">{f.desc}</span>
              </button>
            ))}
          </aside>
          <section className="features-detail">
            <h2>{activeFeature.detail.heading}</h2>
            <p>{activeFeature.detail.text}</p>
            <img
              src={activeFeature.detail.img}
              alt={activeFeature.detail.heading}
              className="feature-img"
            />
          </section>
        </div>
        <div className="features-cards-row">
          {cards.map(card => (
            <div key={card.title} className="feature-card">
              <span className="feature-icon">{card.icon}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
          <div>
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
