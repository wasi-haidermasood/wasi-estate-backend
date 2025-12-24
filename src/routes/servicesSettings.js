// src/routes/servicesSettings.js
const express = require('express');
const { SERVICES_SETTINGS } = require('../data/servicesSettings');
const ServicesSettings = require('../models/ServicesSettings');
const auth = require('../middleware/auth');

const router = express.Router();

async function getOrCreateServicesSettings() {
  let settings = await ServicesSettings.findOne();
  if (!settings) {
    settings = new ServicesSettings(SERVICES_SETTINGS);
    await settings.save();
    console.log('✅ Seeded ServicesSettings from data/servicesSettings.js');
  }
  return settings;
}

// GET /api/services-settings  (public - content only)
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateServicesSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching services settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/services-settings  (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateServicesSettings();
    settings.set(req.body);
    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating services settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;