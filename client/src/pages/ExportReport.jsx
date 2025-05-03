import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/ExportReport.css'; // Import your CSS styles

const initialSections = [
  { key: 'summarySpending', label: 'Summary of Spending', checked: true },
  { key: 'categorizedExpenses', label: 'Categorized Expenses', checked: true },
  { key: 'budgetTracking', label: 'Budget Tracking', checked: true },
  { key: 'analysisDecision', label: 'Analysis and Decision Making', checked: true }
];

// Sample data for each category
const initialData = {
  summarySpending: {
    totalSpent: "$3,500",
    totalIncome: "$5,800",
    netSavings: "$2,300"
  },
  categorizedExpenses: [
    { category: "Rent", amount: "$1,200" },
    { category: "Groceries", amount: "$450" },
    { category: "Utilities", amount: "$150" },
    { category: "Entertainment", amount: "$300" }
  ],
  budgetTracking: {
    monthlyBudget: "$4,000",
    spentThisMonth: "$3,500",
    remainingBudget: "$500"
  },
  analysisDecision: {
    recommendations: [
      "Reduce entertainment expenses by 10%",
      "Increase savings by automating transfers",
      "Review subscription services for possible cancellations"
    ]
  }
};

const ExportReport = () => {
  const [sections, setSections] = useState(initialSections);
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('Last 30 days');

  const getSelectedData = () => {
    const selected = {};
    sections.forEach(s => {
      if (s.checked) selected[s.key] = initialData[s.key];
    });
    return selected;
  };

  // Helper to add a title with spacing in PDF
  const addSectionTitle = (doc, title, y) => {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 14, y);
    return y + 10;
  };

  // Helper to add normal text
  const addText = (doc, text, y, fontSize = 12, fontStyle = 'normal') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    doc.text(text, 14, y);
    return y + 8;
  };

  // Export as PDF with formatted sections
  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Export Report', 14, y);
    y += 14;

    const data = getSelectedData();

    if (data.summarySpending) {
      y = addSectionTitle(doc, 'Summary of Spending:', y);
      const summary = data.summarySpending;
      y = addText(doc, `Total Spent: ${summary.totalSpent}`, y);
      y = addText(doc, `Total Income: ${summary.totalIncome}`, y);
      y = addText(doc, `Net Savings: ${summary.netSavings}`, y);
      y += 6;
    }

    if (data.categorizedExpenses) {
      y = addSectionTitle(doc, 'Categorized Expenses:', y);
      const expenses = data.categorizedExpenses;
      expenses.forEach(exp => {
        y = addText(doc, `${exp.category}: ${exp.amount}`, y);
      });
      y += 6;
    }

    if (data.budgetTracking) {
      y = addSectionTitle(doc, 'Budget Tracking:', y);
      const budget = data.budgetTracking;
      y = addText(doc, `Monthly Budget: ${budget.monthlyBudget}`, y);
      y = addText(doc, `Spent This Month: ${budget.spentThisMonth}`, y);
      y = addText(doc, `Remaining Budget: ${budget.remainingBudget}`, y);
      y += 6;
    }

    if (data.analysisDecision) {
      y = addSectionTitle(doc, 'Analysis and Decision Making:', y);
      const recs = data.analysisDecision.recommendations;
      recs.forEach((rec, idx) => {
        y = addText(doc, `${idx + 1}. ${rec}`, y);
      });
      y += 6;
    }

    doc.save('export-report.pdf');
  };

  const handleExportJSON = () => {
    const selectedData = getSelectedData();
    const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = () => {
    if (format === 'pdf') handleExportPDF();
    else handleExportJSON();
  };

  const handleSectionChange = idx => {
    setSections(sections =>
      sections.map((s, i) => (i === idx ? { ...s, checked: !s.checked } : s))
    );
  };

  return (
    <div className="export-report-page">
      <div className="export-header">
        <button className="back-btn" onClick={() => window.history.back()}>← Back</button>
        <span className="logo"><span className="logo-icon">📈</span> Expetrak</span>
        <button className="close-btn" onClick={() => window.history.back()}>Close</button>
      </div>
      <div className="export-content">
        <h1>Export Report</h1>
        <div className="export-form-row">
          <div className="export-form-main">
            <label className="export-label">Date Range</label>
            <select
              className="export-input"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>

            <label className="export-label">Export Format</label>
            <select
              className="export-input"
              value={format}
              onChange={e => setFormat(e.target.value)}
            >
              <option value="pdf">PDF Document</option>
              <option value="json">JSON File</option>
            </select>
          </div>
          <div className="export-form-side">
            <div className="export-label">Include Sections</div>
            {sections.map((section, idx) => (
              <label className="export-checkbox" key={section.key}>
                <input
                  type="checkbox"
                  checked={section.checked}
                  onChange={() => handleSectionChange(idx)}
                />
                <span className="custom-checkbox"></span>
                {section.label}
              </label>
            ))}
          </div>
        </div>
        <div className="export-preview">
          <div className="export-preview-title">Report Preview</div>
          <div className="export-preview-desc">
            Your report will include data from {dateRange.toLowerCase()}
          </div>
          <div className="export-actions">
            <button className="cancel-btn" onClick={() => window.history.back()}>Cancel</button>
            <button className="generate-btn" onClick={handleGenerate}>Generate Report</button>
          </div>
        </div>
      </div>
      <footer className="export-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-title">Product</div>
            <ul>
              <li>Features</li>
              <li>Pricing</li>
              <li>Updates</li>
              <li>Beta Program</li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Company</div>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="footer-title">Resources</div>
            <ul>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExportReport;
