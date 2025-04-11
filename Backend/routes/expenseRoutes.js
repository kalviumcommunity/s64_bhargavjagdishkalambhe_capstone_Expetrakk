const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create an expense
router.post('/', async (req, res) => {
  try {
    const { category, amount, date, notes } = req.body;

    // Validation checks
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Valid category is required' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Valid date is required' });
    }

    const newExpense = new Expense({
      category: category.trim(),
      amount: Number(amount.toFixed(2)),
      date: new Date(date),
      notes: notes?.trim()
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Read all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ error: 'No expenses found' });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { category, amount, date, notes } = req.body;

    // Basic validation for updates
    if (category && typeof category !== 'string') {
      return res.status(400).json({ error: 'Valid category is required' });
    }

    if (amount && (typeof amount !== 'number' || amount <= 0)) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    if (date && isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Valid date is required' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        category: category?.trim() || undefined,
        amount: amount ? Number(amount.toFixed(2)) : undefined,
        date: date ? new Date(date) : undefined,
        notes: notes?.trim() || undefined
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).json({ error: 'Invalid expense ID' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});



module.exports = router;
