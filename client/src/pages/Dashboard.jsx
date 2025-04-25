// src/pages/Dashboard.jsx
import React from 'react';
import '../styles/Dashboard.css';


const Dashboard = () => {
  return (
    <main className="dashboard-main"> 
    <div className='dashProp'>
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <p className="dashboard-subtitle">Your financial summary and recent activity</p>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span className="card-label">Balance</span>
          <span className="card-value">$12,500.00</span>
          <span className="card-growth positive">+4.2%</span>
        </div>
        <div className="dashboard-card">
          <span className="card-label">Income (This Month)</span>
          <span className="card-value">$4,000.00</span>
          <span className="card-growth positive">+2.1%</span>
        </div>
        <div className="dashboard-card">
          <span className="card-label">Expenses (This Month)</span>
          <span className="card-value">$2,350.00</span>
          <span className="card-growth negative">-1.3%</span>
        </div>
        <div className="dashboard-card">
          <span className="card-label">Investments</span>
          <span className="card-value">$8,200.00</span>
          <span className="card-growth positive">+0.7%</span>
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Recent Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apr 18, 2025</td>
              <td>Starbucks</td>
              <td>Coffee</td>
              <td className="negative">- $5.20</td>
            </tr>
            <tr>
              <td>Apr 17, 2025</td>
              <td>Salary</td>
              <td>Income</td>
              <td className="positive">+ $2,000.00</td>
            </tr>
            <tr>
              <td>Apr 16, 2025</td>
              <td>Amazon</td>
              <td>Shopping</td>
              <td className="negative">- $120.00</td>
            </tr>
            <tr>
              <td>Apr 15, 2025</td>
              <td>Dividends</td>
              <td>Investments</td>
              <td className="positive">+ $40.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </main> 
  );
};

export default Dashboard;
