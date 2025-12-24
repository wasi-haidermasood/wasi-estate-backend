// src/routes/about.js
const express = require('express');
const { ABOUT_CONFIG } = require('../data/about');
const AboutSettings = require('../models/AboutSettings');
const auth = require('../middleware/auth'); // <-- add this

const router = express.Router();

async function getOrCreateAboutSettings() {
  let settings = await AboutSettings.findOne();
  if (!settings) {
    settings = new AboutSettings(ABOUT_CONFIG);
    await settings.save();
    console.log('✅ Seeded AboutSettings from data/about.js');
  }
  return settings;
}

// GET /api/about  (public)
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateAboutSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching about settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/about  (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateAboutSettings();
    settings.set(req.body); // merge incoming changes
    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating about settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;