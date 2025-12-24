// src/routes/testimonials.js
const express = require('express');
const { TESTIMONIALS } = require('../data/testimonials');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

const router = express.Router();

// Seed DB with TESTIMONIALS if empty
async function ensureSeeded() {
  const count = await Testimonial.countDocuments();
  if (count === 0) {
    const docs = TESTIMONIALS.map((t) => ({
      id: t.id,                        // e.g. "t-1"
      name: t.name,
      role: t.role,
      location: t.location,
      avatar: t.avatar,
      rating: t.rating,
      text: t.text,
      results: t.results,
      propertyType: t.propertyType,
      image: t.image,
      isVideo: t.isVideo || false,
      videoUrl: t.videoUrl || null,
      featured: !!t.featured,
      status: 'approved',             // seed as approved
    }));

    await Testimonial.insertMany(docs);
    console.log('✅ Seeded testimonials collection from data/testimonials.js');
  }
}

/**
 * PUBLIC GET /api/testimonials
 * Returns only APPROVED testimonials
 */
router.get('/', async (req, res) => {
  try {
    await ensureSeeded();

    const items = await Testimonial.find({
      $or: [
        { status: 'approved' },
        { status: { $exists: false } }, // backward compatibility
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ items });
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUBLIC POST /api/testimonials
 * Body: { name, role?, location?, rating, text, propertyType?, image? }
 * New reviews start as PENDING (not shown on site until approved).
 */
router.post('/', async (req, res) => {
  try {
    const { name, role, location, rating, text, propertyType, image } = req.body;

    if (!name || !text || rating === undefined) {
      return res
        .status(400)
        .json({ message: 'Name, rating and review text are required' });
    }

    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Fallback initials from name
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const nowId = `t-${Date.now()}`;

    const testimonial = new Testimonial({
      id: nowId,
      name,
      role: role || 'Client',
      location: location || '',
      avatar: initials,
      rating: numericRating,
      text,
      results: 'Client Review',
      propertyType: propertyType || 'General',
      image: image || '',
      isVideo: false,
      videoUrl: null,
      featured: false,
      status: 'pending', // NEW: public reviews start as pending
    });

    await testimonial.save();

    res.status(201).json(testimonial.toObject());
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN GET /api/testimonials/admin
 * Returns ALL testimonials (pending/approved/draft)
 */
router.get('/admin', auth, async (req, res) => {
  try {
    await ensureSeeded();

    const items = await Testimonial.find().sort({ createdAt: -1 }).lean();
    res.json({ items });
  } catch (err) {
    console.error('Error fetching admin testimonials:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN PUT /api/testimonials/:id
 * Update testimonial by Mongo _id
 * Can change status, featured, text, etc.
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.set(req.body);
    await testimonial.save();

    res.json(testimonial.toObject());
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN DELETE /api/testimonials/:id
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;