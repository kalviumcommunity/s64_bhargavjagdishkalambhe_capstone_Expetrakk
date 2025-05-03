import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import '../styles/ExpenseBreakdown.css'; // Import your CSS styles 



// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseBreakdown = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample data - replace with your actual data fetching logic
  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setExpenses([
        { category: 'Rent', amount: 1500, date: '2025-01-14' },
        { category: 'Groceries', amount: 450, date: '2025-01-05' },
        { category: 'Utilities', amount: 200, date: '2025-01-10' },
        { category: 'Entertainment', amount: 300, date: '2025-01-20' },
        { category: 'Transportation', amount: 150, date: '2025-01-08' },
        { category: 'Health', amount: 100, date: '2025-01-25' }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  // Process data for charts
  const processDataForCharts = () => {
    const categories = {};
    
    expenses.forEach(expense => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });
    
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            '#5f3dc4', // Purple (primary)
            '#22bb33', // Green
            '#ff9966', // Orange
            '#3d2fd4', // Blue
            '#e74c3c', // Red
            '#f39c12'  // Yellow
          ],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  };
  
  // Pie chart options
  const pieOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `$${value} (${percentage}%)`;
          }
        }
      }
    },
    layout: {
      padding: 20
    }
  };
  
  // Bar chart options
  const barOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  
  // Bar chart data
  const barData = {
    labels: processDataForCharts().labels,
    datasets: [
      {
        data: processDataForCharts().datasets[0].data,
        backgroundColor: processDataForCharts().datasets[0].backgroundColor,
        borderWidth: 0,
      }
    ]
  };

  return (
    <div className="expense-breakdown-overlay">
      <div className="expense-breakdown-modal">
        <div className="expense-breakdown-header">
          <h2>Expense Breakdown</h2>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        
        <div className="expense-breakdown-tabs">
          <button 
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`} 
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Trend
          </button>
        </div>
        
        <div className="expense-breakdown-content">
          {isLoading ? (
            <div className="loading">Loading expense data...</div>
          ) : expenses.length === 0 ? (
            <div className="no-data">No expense data available</div>
          ) : (
            <>
              <div className="chart-container">
                {activeTab === 'categories' ? (
                  <Pie data={processDataForCharts()} options={pieOptions} />
                ) : (
                  <Bar data={barData} options={barOptions} />
                )}
              </div>
              
              <div className="expense-summary">
                <div className="summary-card">
                  <h3>Total Expenses</h3>
                  <p className="summary-value negative">
                    ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="summary-card">
                  <h3>Largest Expense</h3>
                  <p className="summary-category">
                    {Object.entries(processDataForCharts().labels.reduce((obj, category, i) => {
                      obj[category] = processDataForCharts().datasets[0].data[i];
                      return obj;
                    }, {})).sort((a, b) => b[1] - a[1])[0][0]}
                  </p>
                  <p className="summary-value negative">
                    ${Math.max(...processDataForCharts().datasets[0].data).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="expense-table">
                <h3>Expense Details</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(processDataForCharts().labels.reduce((obj, category, i) => {
                      obj[category] = processDataForCharts().datasets[0].data[i];
                      return obj;
                    }, {}))
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, amount]) => {
                        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
                        const percentage = ((amount / total) * 100).toFixed(1);
                        
                        return (
                          <tr key={category}>
                            <td>{category}</td>
                            <td className="amount negative">${amount.toFixed(2)}</td>
                            <td>{percentage}%</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
