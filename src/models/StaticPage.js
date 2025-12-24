// src/models/StaticPage.js
const mongoose = require('mongoose');

const StaticPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    body: String,   // HTML from ReactQuill

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },

    // SEO fields
    seoTitle: String,
    seoDescription: String,
    seoImage: String,

    // NEW: nav/footer visibility & labels/order
    showInNav: { type: Boolean, default: false },
    navLabel: String,
    navOrder: { type: Number, default: 0 },

    showInFooter: { type: Boolean, default: false },
    footerLabel: String,
    footerOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StaticPage', StaticPageSchema);