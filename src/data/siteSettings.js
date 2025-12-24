// src/data/siteSettings.js

const SITE_SETTINGS = {
  // For local dev you can use your Vite URL; change later in dashboard
  baseUrl: "http://localhost:8080",
  sitemapEnabled: false,
  // Default: block everything until you go live and change this
  robotsContent: `User-agent: *
Disallow: /`,
};

module.exports = { SITE_SETTINGS };