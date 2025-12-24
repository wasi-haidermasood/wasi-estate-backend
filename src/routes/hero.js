const express = require('express');
const { HERO_SETTINGS } = require('../data/hero');
const HeroSettings = require('../models/HeroSettings');
const auth = require('../middleware/auth'); // <-- add this

const router = express.Router();

// Ensure we always have one hero settings document
async function getOrCreateHeroSettings() {
  let settings = await HeroSettings.findOne();
  if (!settings) {
    settings = new HeroSettings(HERO_SETTINGS);
    await settings.save();
  }
  return settings;
}

// GET /api/hero  -> return current settings (public)
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateHeroSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching hero settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/hero  -> update settings (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateHeroSettings();

    // Merge incoming changes into the document (handles nested fields)
    settings.set(req.body);

    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating hero settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;