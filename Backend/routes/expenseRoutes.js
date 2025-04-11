const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

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