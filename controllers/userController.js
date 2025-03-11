const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Controller to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Create a new user instance
    const user = new User({ name, email, password });
    // Save user to database (password is hashed in user schema)
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to log in an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid user' });
    }
    // Compare password with hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    // Sign a JWT valid for 24 hours
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
