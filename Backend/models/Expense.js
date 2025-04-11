const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Expense', expenseSchema);