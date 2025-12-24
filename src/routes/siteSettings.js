// src/routes/siteSettings.js
const express = require('express');
const { SITE_SETTINGS } = require('../data/siteSettings');
const SiteSettings = require('../models/SiteSettings');
const auth = require('../middleware/auth');

const router = express.Router();

async function getOrCreateSiteSettings() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = new SiteSettings(SITE_SETTINGS);
    await settings.save();
    console.log('✅ Seeded SiteSettings from data/siteSettings.js');
  }
  return settings;
}

// ADMIN: GET /api/site-settings
router.get('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching site settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN: PUT /api/site-settings
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();
    settings.set(req.body);
    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating site settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, getOrCreateSiteSettings };