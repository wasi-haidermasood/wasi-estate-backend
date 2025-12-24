// src/models/Service.js
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // e.g. "property-sales"
    kind: {
      type: String,
      enum: ['main', 'additional'],
      default: 'main',
    }, // main cards vs additional cards

    icon: String,              // string key like "Home", "Hammer"
    title: String,
    shortDescription: String,  // for cards
    features: [String],        // array of bullet points
    image: String,             // card image URL
    commission: String,        // "Only 1% Commission", ...
    color: String,             // e.g. "from-blue-500 to-blue-600"
    body: String,              // full page content (Markdown or HTML)

    // --- NEW SEO FIELDS ---
    seoTitle: String,
    seoDescription: String,
    seoImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);