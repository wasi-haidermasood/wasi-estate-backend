// src/routes/properties.js
const express = require('express');
const mongoose = require('mongoose'); // <-- add this
const { PROPERTIES } = require('../data/properties');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Seed DB with PROPERTIES if empty
async function ensureSeeded() {
  const count = await Property.countDocuments();
  if (count === 0) {
    const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    // Custom ID used by frontend (e.g. "prop-1")
    id: String,

    title: String,
    city: String,
    location: String,           // e.g. "DHA Phase 6"
    type: String,               // "House", "Apartment", "Commercial", "Plot"
    transactionType: String,    // "buy", "rent", "projects"
    price: Number,              // PKR amount

    beds: Number,
    baths: Number,
    area: String,               // e.g. "1 Kanal", "2000 sq.ft"

    image: String,              // main/cover image URL
    images: [String],           // gallery image URLs

    // SEO fields
    seoTitle: String,
    seoDescription: String,
    seoImage: String,

    // NEW: long description for page body (HTML from editor)
    descriptionHtml: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);

    await Property.insertMany(docs);
    console.log('✅ Seeded properties collection from data/properties.js');
  }
}

/**
 * GET /api/properties
 * Query params:
 *  - transactionType: buy | rent | projects | all
 *  - location: string (partial match: city, location, or title)
 *  - propertyType: "House" | "Apartment" | "Commercial" | "Plot" | "All Types"
 *  - priceRange: "Any Price" | "Up to 1 Crore" | "1 - 5 Crore" | "5 - 10 Crore" | "10 Crore+"
 */
router.get('/', async (req, res) => {
  try {
    await ensureSeeded();

    const {
      transactionType,
      location = '',
      propertyType = 'All Types',
      priceRange = 'Any Price',
    } = req.query;

    const filter = {};

    // Transaction type
    if (transactionType && transactionType !== 'all') {
      filter.transactionType = transactionType.toLowerCase();
    }

    // Location search (city, location, title)
    if (location) {
      const loc = String(location);
      filter.$or = [
        { city: { $regex: loc, $options: 'i' } },
        { location: { $regex: loc, $options: 'i' } },
        { title: { $regex: loc, $options: 'i' } },
      ];
    }
router.post('/', auth, async (req, res) => {
  console.log('POST /api/properties hit, body:', req.body);
  // ... rest of code
});

router.put('/:id', auth, async (req, res) => {
  console.log('PUT /api/properties/:id hit, params:', req.params);
  // ... rest of code
});

router.delete('/:id', auth, async (req, res) => {
  console.log('DELETE /api/properties/:id hit, params:', req.params);
  // ... rest of code
});
    // Property type
    if (propertyType && propertyType !== 'All Types') {
      filter.type = propertyType;
    }

    // Price range
    let minPrice = 0;
    let maxPrice = Number.MAX_SAFE_INTEGER;

    switch (priceRange) {
      case 'Up to 1 Crore':
        maxPrice = 10000000;
        break;
      case '1 - 5 Crore':
        minPrice = 10000000;
        maxPrice = 50000000;
        break;
      case '5 - 10 Crore':
        minPrice = 50000000;
        maxPrice = 100000000;
        break;
      case '10 Crore+':
        minPrice = 100000000;
        maxPrice = Number.MAX_SAFE_INTEGER;
        break;
      case 'Any Price':
      default:
        break;
    }

    filter.price = { $gte: minPrice, $lte: maxPrice };

    const items = await Property.find(filter).lean();
    res.json({
      total: items.length,
      items,
    });
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/properties
 * Create a new property (admin only)
 */
router.post('/', auth, async (req, res) => {
  try {
    const {
      id,
      title,
      city,
      location,
      type,
      transactionType,
      price,
      beds,
      baths,
      area,
      image,

      // NEW SEO fields
      seoTitle,
      seoDescription,
      seoImage,

      // NEW: gallery images
      images,
    } = req.body;

    if (!title || !city || !location || !type || !transactionType || price == null) {
      return res
        .status(400)
        .json({ message: 'title, city, location, type, transactionType and price are required' });
    }

    // Auto-generate custom id if not provided
    let customId = id;
    if (!customId) {
      customId = `prop-${Date.now()}`;
    }

    const property = new Property({
      id: customId,
      title,
      city,
      location,
      type,
      transactionType: transactionType.toLowerCase(),
      price,
      beds,
      baths,
      area,
      image,
      images: Array.isArray(images) && images.length ? images : image ? [image] : [],

      seoTitle: seoTitle || '',
      seoDescription: seoDescription || '',
      seoImage: seoImage || '',
    });

    await property.save();
    res.status(201).json(property.toObject());
  } catch (err) {
    console.error('Error creating property:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/** 

    // Auto-generate custom id if not provided
    let customId = id;
    if (!customId) {
      customId = `prop-${Date.now()}`;
    }

    const property = new Property({
      id: customId,
      title,
      city,
      location,
      type,
      transactionType: transactionType.toLowerCase(),
      price,
      beds,
      baths,
      area,
      image,
    });

    await property.save();
    res.status(201).json(property.toObject());
  } catch (err) {
    console.error('Error creating property:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/properties/:id
 * Update existing property by Mongo _id (admin only)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.set(req.body);

    if (property.transactionType) {
      property.transactionType = property.transactionType.toLowerCase();
    }

    await property.save();
    res.json(property.toObject());
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/properties/:id
 * Delete property by Mongo _id (admin only)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted' });
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/properties/:id
 * Get a single property by Mongo _id or by custom id field
 */
router.get('/:id', async (req, res) => {
  try {
    await ensureSeeded();

    const { id } = req.params;
    let property = null;

    // Try Mongo ObjectId first
    if (mongoose.Types.ObjectId.isValid(id)) {
      property = await Property.findById(id).lean();
    }

    // Fallback: custom id field (e.g. "prop-1")
    if (!property) {
      property = await Property.findOne({ id }).lean();
    }

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error('Error fetching property:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;