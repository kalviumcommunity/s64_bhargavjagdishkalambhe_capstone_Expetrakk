const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST - Create User
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Add validation to ensure all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      userId: newUser._id,
      email: newUser.email
    });
  } catch (error) {
    console.error('Error saving user:', error); // Debugging log
    res.status(400).json({ message: error.message });
  }
});
// GET - Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User:', user); // Debugging log
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Ensure user has a hashed password
    if (!user.password) {
      return res.status(500).json({ message: 'Password hash is missing for this user' });
    }
    console.log('Hashed Password:', user.password); // Debugging log

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30min' }
    );

    // Return user info and token
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.error('Login Error:', error); // Debugging log for server-side error
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
