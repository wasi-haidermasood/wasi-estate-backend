// src/models/SiteSettings.js
const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema(
  {
    // Public site URL for sitemap, e.g. "https://wasimarketingsolutions.com"
    baseUrl: { type: String, default: "" },

    // Whether to serve sitemap.xml
    sitemapEnabled: { type: Boolean, default: false },

    // robots.txt content (you can put anything here)
    robotsContent: {
      type: String,
      default: "User-agent: *\nDisallow: /",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);