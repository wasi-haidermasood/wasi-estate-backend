// src/routes/contact.js
const express = require('express');
const { CONTACT_CONFIG } = require('../data/contact');
const ContactSettings = require('../models/ContactSettings');
const auth = require('../middleware/auth'); // <-- add
const ContactMessage = require('../models/ContactMessage'); // <-- add this


const router = express.Router();

async function getOrCreateContactSettings() {
  let settings = await ContactSettings.findOne();
  if (!settings) {
    settings = new ContactSettings(CONTACT_CONFIG);
    await settings.save();
    console.log('✅ Seeded ContactSettings from data/contact.js');
  }
  return settings;
}

// GET /api/contact (public)
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreateContactSettings();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error fetching contact settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/contact (admin only)
router.put('/', auth, async (req, res) => {
  try {
    const settings = await getOrCreateContactSettings();
    settings.set(req.body);
    await settings.save();
    res.json(settings.toObject());
  } catch (err) {
    console.error('Error updating contact settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /api/contact/submit  (public form submission)
router.post('/submit', async (req, res) => {
  try {
    const { name, phone, propertyType, budget, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const doc = new ContactMessage({
      name,
      phone,
      propertyType: propertyType || '',
      budget: budget || '',
      message: message || '',
    });

    await doc.save();
    res.status(201).json({ message: 'Inquiry received' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;