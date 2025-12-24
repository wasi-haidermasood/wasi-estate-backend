// src/routes/seo.js
const express = require('express');
const { SEO_CONFIG } = require('../data/seo');
const SeoSettings = require('../models/SeoSettings');
const auth = require('../middleware/auth');

const router = express.Router();

async function getOrCreateSeoSettings() {
  let settings = await SeoSettings.findOne();
  if (!settings) {
    settings = new SeoSettings(SEO_CONFIG);
    await settings.save();
    console.log('✅ Seeded SeoSettings from data/seo.js');
  }
  return settings;
}

// GET /api/seo (public)
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateSeoSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching SEO settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/seo (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateSeoSettings();
    settings.set(req.body);
    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating SEO settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;