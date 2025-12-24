// src/routes/seoPublic.js
const express = require('express');
const { getOrCreateSiteSettings } = require('./siteSettings');
const StaticPage = require('../models/StaticPage');
const Post = require('../models/Post');
const Service = require('../models/Service');
const Property = require('../models/Property');

const router = express.Router();

/**
 * GET /robots.txt
 * Serves robots.txt content from SiteSettings.robotsContent
 */
router.get('/robots.txt', async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();
    res.type('text/plain').send(settings.robotsContent || '');
  } catch (err) {
    console.error('Error serving robots.txt:', err);
    res.type('text/plain').send('User-agent: *\nDisallow: /');
  }
});

/**
 * GET /sitemap.xml
 * Generates sitemap if enabled and baseUrl is set
 */
router.get('/sitemap.xml', async (req, res) => {
  try {
    const settings = await getOrCreateSiteSettings();

    if (!settings.sitemapEnabled || !settings.baseUrl) {
      // If disabled or baseUrl not set, return 404 or empty sitemap
      return res.status(404).type('text/plain').send('Sitemap disabled');
    }

    const BASE_URL = settings.baseUrl.replace(/\/+$/, '');

    const [pages, posts, services, properties] = await Promise.all([
      StaticPage.find({ status: 'published' }).select('slug updatedAt').lean(),
      Post.find({ status: 'published' }).select('slug updatedAt').lean(),
      Service.find().select('slug updatedAt').lean(),
      Property.find().select('_id updatedAt').lean(),
    ]);

    const urls = [];

    // Core routes
    urls.push({ loc: `${BASE_URL}/`, changefreq: 'daily', priority: 1.0 });
    urls.push({ loc: `${BASE_URL}/properties`, changefreq: 'daily', priority: 0.9 });
    urls.push({ loc: `${BASE_URL}/blog`, changefreq: 'weekly', priority: 0.7 });
    // Add other main pages if needed, e.g. /services

    // Static pages (/pages/:slug)
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

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
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

    res.header('Content-Type', 'application/xml').send(xml);
  } catch (err) {
    console.error('Error generating sitemap:', err);
    res.status(500).type('text/plain').send('Server error');
  }
});

module.exports = router;