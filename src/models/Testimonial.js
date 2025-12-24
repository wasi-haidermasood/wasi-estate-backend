// src/models/Testimonial.js
const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    // Custom ID (e.g. "t-1", "t-1234567890")
    id: String,

    name: String,
    role: String,
    location: String,
    avatar: String,     // initials like "AK"
    rating: Number,
    text: String,
    results: String,
    propertyType: String,
    image: String,
    isVideo: Boolean,
    videoUrl: String,
    featured: { type: Boolean, default: false },

    // NEW: moderation status
    // "pending"  -> waiting for admin to approve
    // "approved" -> visible on website
    // "draft"    -> hidden by admin
    status: {
      type: String,
      enum: ['pending', 'approved', 'draft'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);