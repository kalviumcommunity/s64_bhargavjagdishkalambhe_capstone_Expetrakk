const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library'); // Import Google Auth Library
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Google OAuth Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Use your Google Client ID from .env

// Google OAuth Route
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload(); // Extract user information from the token
    const { email, name, picture } = payload;

    // Example: Check if the user exists in your database, or create a new user
    // const user = await findOrCreateUser(email, name, picture);

    // Example: Generate your own JWT for the user
    // const token = generateYourJWT(user);

    // For demonstration purposes, return the user payload
    res.json({ user: { email, name, picture } });
  } catch (err) {
    console.error('Error verifying Google token:', err);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));