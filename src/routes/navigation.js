// src/routes/navigation.js
const express = require('express');
const { NAVIGATION_CONFIG } = require('../data/navigation');
const NavigationConfig = require('../models/NavigationConfig');
const auth = require('../middleware/auth');        // <-- add


const router = express.Router();

// Helper: ensure a config document exists
async function getOrCreateConfig() {
  let config = await NavigationConfig.findOne();
  if (!config) {
    config = new NavigationConfig(NAVIGATION_CONFIG);
    await config.save();
  }
  return config;
}

// GET /api/navigation
router.get('/', async (req, res) => {
  try {
    const config = await getOrCreateConfig();
    res.json(config.toObject());
  } catch (err) {
    console.error('Error fetching navigation config:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/navigation  (for future admin UI or Postman updates)
router.put('/', auth, async (req, res) => {  try {
    const config = await getOrCreateConfig();
    // shallow merge body into existing config
    Object.assign(config, req.body);
    await config.save();
    res.json(config.toObject());
  } catch (err) {
    console.error('Error updating navigation config:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;