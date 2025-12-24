// src/routes/sitemap.js
const express = require('express');
const StaticPage = require('../models/StaticPage');
const Post = require('../models/Post');
const Service = require('../models/Service');
const Property = require('../models/Property');

const router = express.Router();

const BASE_URL = process.env.PUBLIC_BASE_URL || "https://yourdomain.com";

router.get('/sitemap.xml', async (req, res) => {
  try {
    const [pages, posts, services, properties] = await Promise.all([
      StaticPage.find({ status: 'published' }).select('slug updatedAt').lean(),
      Post.find({ status: 'published' }).select('slug updatedAt').lean(),
      Service.find().select('slug updatedAt').lean(),
      Property.find().select('_id updatedAt').lean(),
    ]);

    const urls = [];

    // Home & main sections
    urls.push({ loc: `${BASE_URL}/`, changefreq: 'daily', priority: 1.0 });
    urls.push({ loc: `${BASE_URL}/properties`, changefreq: 'daily', priority: 0.9 });
    urls.push({ loc: `${BASE_URL}/blog`, changefreq: 'weekly', priority: 0.7 });
    // add other key routes as needed

    // Static pages
    pages.forEach((p) => {
      urls.push({
        loc: `${BASE_URL}/pages/${p.slug}`,
        lastmod: p.updatedAt?.toISOString(),
        changefreq: 'monthly',
        priority: 0.5,
      });
    });

    // Blog posts
    posts.forEach((p) => {
      urls.push({
        loc: `${BASE_URL}/blog/${p.slug}`,
        lastmod: p.updatedAt?.toISOString(),
        changefreq: 'weekly',
        priority: 0.6,
      });
    });

    // Services
    services.forEach((s) => {
      urls.push({
        loc: `${BASE_URL}/services/${s.slug}`,
        lastmod: s.updatedAt?.toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      });
    });

    // Properties
    properties.forEach((prop) => {
      urls.push({
        loc: `${BASE_URL}/properties/${prop._id}`,
        lastmod: prop.updatedAt?.toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .map(
          (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
        )
        .join("\n") +
      `\n</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;