// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import ExpenseBreakdown from './ExpenseBreakdown'; 
// Corrected import path

const transactions = [
  { label: "Monthly Salary", date: "Jan 15", amount: "+$5000.00", positive: true, icon: "💰" },
  { label: "Rent Payment", date: "Jan 14", amount: "-$1500.00", positive: false, icon: "🏠" },
  { label: "Grocery Shopping", date: "Jan 13", amount: "-$200.00", positive: false, icon: "🛒" },
  { label: "Freelance Work", date: "Jan 12", amount: "+$800.00", positive: true, icon: "💼" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [showExpenseBreakdown, setShowExpenseBreakdown] = useState(false);

  const handleGenerateReport = () => {
    navigate('/export-report');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-logo">
            <span role="img" aria-label="logo">📊</span> Expetrak
          </div>
          <div className="dashboard-actions">
            <button className="icon-btn" title="User Profile">
              <span role="img" aria-label="user">👤</span>
            </button>
            <button className="icon-btn" title="Settings">
              <span role="img" aria-label="settings">💼</span>
            </button>
            <button className="generate-btn" onClick={handleGenerateReport}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="dashboard-stats-row">
          <div className="dashboard-stat">
            <div className="stat-label">Total Balance</div>
            <div className="stat-value">$4,100.00</div>
          </div>
          <div className="dashboard-stat">
            <div className="stat-label">Income</div>
            <div className="stat-value positive">$5,800.00</div>
          </div>
          <div className="dashboard-stat">
            <div className="stat-label">Expenses</div>
            <div className="stat-value negative">$1,700.00</div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <h2 className="dashboard-section-title">Expense Breakdown</h2>
        <div
          className="dashboard-breakdown-row"
          role="button"
          tabIndex={0}
          aria-label="View Expense Breakdown"
          onClick={() => setShowExpenseBreakdown(true)} // Show ExpenseBreakdown on click
        >
          <span role="img" aria-label="chart">📊</span>
          <span className="dashboard-breakdown-link">View Expense Breakdown</span>
        </div>

        {/* Recent Transactions */}
        <h3 className="dashboard-section-title">Recent Transactions</h3>
        <div className="dashboard-transactions">
          <button className="add-transaction-btn">Add Transaction</button>
          <ul>
            {transactions.map(({ label, date, amount, positive, icon }, idx) => (
              <li key={idx} className="transaction-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }} role="img" aria-label={label}>{icon}</span>
                  <div>
                    <div className="transaction-label">{label}</div>
                    <div className="transaction-date">{date}</div>
                  </div>
                </div>
                <div className={`transaction-amount ${positive ? 'positive' : 'negative'}`}>{amount}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Render ExpenseBreakdown if showExpenseBreakdown is true */}
      {showExpenseBreakdown && (
        <ExpenseBreakdown onClose={() => setShowExpenseBreakdown(false)} />
      )}
    </div>
  );
};

export default Dashboard;
