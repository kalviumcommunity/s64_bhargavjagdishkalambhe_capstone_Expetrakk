const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST - Add Expense
router.post('/', async (req, res) => {
  try {
    const { category, amount, date, notes } = req.body;
    const newExpense = new Expense({ category, amount, date, notes });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - All Expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update Expense
router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Remove Expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { userId, category, amount, date, notes } = req.body;

    const newExpense = new Expense({
      user: userId,
      category,
      amount,
      date,
      notes
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
