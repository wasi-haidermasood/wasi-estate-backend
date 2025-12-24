// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

// Helper: create JWT
function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // 1 day
  );
}

/**
 * POST /api/auth/register-admin
 * One-time endpoint: allows creating the FIRST admin user.
 * After at least one admin exists, this endpoint returns 403.
 */
router.post('/register-admin', async (req, res) => {
  try {
    console.log('req.body at /register-admin:', req.body);
    const count = await AdminUser.countDocuments();
    if (count > 0) {
      return res
        .status(403)
        .json({ message: 'Admin already exists. Registration disabled.' });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email and password are required' });
    }

    const existing = await AdminUser.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new AdminUser({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    await user.save();

    const token = createToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;