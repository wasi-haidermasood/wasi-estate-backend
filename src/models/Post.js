// src/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // e.g. "islamabad-real-estate-trends"
    excerpt: String, // short summary/intro
    body: String,    // HTML from WYSIWYG editor (react-quill)

    coverImage: String, // URL for hero image
    category: String,
    tags: [String],     // ["Islamabad", "Investment", "Tips"]

    // --- NEW: SEO FIELDS ---
    seoTitle: String,        // custom <title> for this post
    seoDescription: String,  // meta description
    seoImage: String,        // override og/twitter image (falls back to coverImage)

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },

    publishedAt: Date, // when it was published
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);