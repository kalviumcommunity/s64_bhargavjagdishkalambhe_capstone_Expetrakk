const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create an expense
router.post('/', async (req, res) => {
  try {
    const { category, amount, date, notes } = req.body;
    const newExpense = new Expense({ category, amount, date, notes });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});



module.exports = router;