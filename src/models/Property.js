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