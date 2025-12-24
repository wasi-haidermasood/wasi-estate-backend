// src/routes/footer.js
const express = require('express');
const { FOOTER_CONFIG } = require('../data/footer');
const FooterSettings = require('../models/FooterSettings');
const auth = require('../middleware/auth'); // <-- add this

const router = express.Router();

async function getOrCreateFooterSettings() {
  let settings = await FooterSettings.findOne();
  if (!settings) {
    settings = new FooterSettings(FOOTER_CONFIG);
    await settings.save();
    console.log('✅ Seeded FooterSettings from data/footer.js');
  }
  return settings;
}

// GET /api/footer (public)
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateFooterSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching footer settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/footer (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateFooterSettings();
    settings.set(req.body);
    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating footer settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;