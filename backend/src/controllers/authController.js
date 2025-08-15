// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // 2. Validate password (using bcrypt)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // 4. Send response
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 1. Check if user exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already in use' });

    // 2. Create user
    const user = new User({ name, email, password });
    await user.save();

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // 4. Send response
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};