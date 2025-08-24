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

    // 3. Generate JWT (INCLUDE isAdmin IN THE TOKEN)
    const token = jwt.sign(
      { 
        id: user._id,
        isAdmin: user.isAdmin // ← THIS IS CRUCIAL
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // 4. Send response (include isAdmin in user data too)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin // ← Also send in response
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

    // 2. Create user (default isAdmin: false)
    const user = new User({ name, email, password });
    await user.save();

    // 3. Generate JWT (INCLUDE isAdmin IN THE TOKEN)
    const token = jwt.sign(
      { 
        id: user._id,
        isAdmin: user.isAdmin // ← THIS IS CRUCIAL
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // 4. Send response (include isAdmin in user data too)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin // ← Also send in response
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};