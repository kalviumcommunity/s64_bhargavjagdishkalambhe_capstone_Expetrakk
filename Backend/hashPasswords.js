const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables from .env file
const User = require('./models/User'); // Adjust the path to your User model

// Connect to MongoDB using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Debugging connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const hashMissingPasswords = async () => {
  try {
    const users = await User.find({});
    console.log(`Found ${users.length} users in the database.`);

    for (const user of users) {
      if (!user.password || !user.password.startsWith('$2b$')) {
        const defaultPassword = 'defaultPassword123'; // Replace with a secure default password
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        user.password = hashedPassword;
        await user.save();
        console.log(`Password hashed for user: ${user.email}`);
      }
    }

    console.log('Password hashing complete.');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  } finally {
    mongoose.connection.close();
  }
};

hashMissingPasswords();