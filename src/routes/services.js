// src/routes/services.js
const express = require('express');
const { SERVICES } = require('../data/services');
const Service = require('../models/Service');
const auth = require('../middleware/auth'); // <-- add this

const router = express.Router();
// Seed DB with SERVICES if empty
async function ensureSeeded() {
  const count = await Service.countDocuments();
  if (count === 0) {
    const docs = SERVICES.map((s) => ({
      slug: s.slug,
      kind: s.kind || 'main',
      icon: s.icon || '',
      title: s.title,
      shortDescription: s.shortDescription || '',
      features: s.features || [],
      image: s.image || '',
      commission: s.commission || '',
      color: s.color || '',
      body: s.body || '',

      // NEW: default SEO fields empty (or copy from title/shortDescription)
      seoTitle: '',
      seoDescription: '',
      seoImage: '',
    }));

    await Service.insertMany(docs);
    console.log('✅ Seeded services collection from data/services.js');
  }
}

// POST /api/services → create new service (ADMIN ONLY)
router.post('/', auth, async (req, res) => {
  try {
    const body = req.body;

    const service = new Service({
      slug: body.slug,
      kind: body.kind || 'main',
      icon: body.icon || '',
      title: body.title,
      shortDescription: body.shortDescription || '',
      features: body.features || [],
      image: body.image || '',
      commission: body.commission || '',
      color: body.color || '',
      body: body.body || '',

      // NEW SEO
      seoTitle: body.seoTitle || '',
      seoDescription: body.seoDescription || '',
      seoImage: body.seoImage || '',
    });

    await service.save();
    res.status(201).json(service.toObject());
  } catch (err) {
    console.error('Error creating service:', err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Slug already exists. Please choose another.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/services → { main, additional } (public)
router.get('/', async (req, res) => {
  try {
    await ensureSeeded();

    const all = await Service.find().lean();

    const main = all.filter((s) => s.kind === 'main');
    const additional = all.filter((s) => s.kind === 'additional');

    res.json({ main, additional });
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/services/:slug → single service by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    await ensureSeeded();

    const service = await Service.findOne({ slug: req.params.slug }).lean();
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/services → create new service (ADMIN ONLY)
router.post('/', auth, async (req, res) => {
  try {
    const body = req.body;

    const service = new Service({
      slug: body.slug,
      kind: body.kind || 'main',
      icon: body.icon || '',
      title: body.title,
      shortDescription: body.shortDescription || '',
      features: body.features || [],
      image: body.image || '',
      commission: body.commission || '',
      color: body.color || '',
      body: body.body || '',
    });

    await service.save();
    res.status(201).json(service.toObject());
  } catch (err) {
    console.error('Error creating service:', err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Slug already exists. Please choose another.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/services/:id → update service by Mongo _id (ADMIN ONLY)
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Merge request body into document
    service.set(req.body);
    await service.save();

    res.json(service.toObject());
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/services/:id → delete service by Mongo _id (ADMIN ONLY)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service.toObject());
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;