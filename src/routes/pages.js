// src/routes/pages.js
const express = require('express');
const StaticPage = require('../models/StaticPage');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * ADMIN: GET /api/pages/admin
 * List all pages (draft + published)
 */
router.get('/admin', auth, async (req, res) => {
  try {
    const pages = await StaticPage.find().sort({ createdAt: -1 }).lean();
    res.json(pages);
  } catch (err) {
    console.error('Error fetching admin pages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN: POST /api/pages/admin
 * Create a new page
 * Body: {
 *   title, slug, body, status,
 *   seoTitle, seoDescription, seoImage,
 *   showInNav, navLabel, navOrder,
 *   showInFooter, footerLabel, footerOrder
 * }
 */
router.post('/admin', auth, async (req, res) => {
  try {
    const {
      title,
      slug,
      body,
      status,
      seoTitle,
      seoDescription,
      seoImage,
      showInNav,
      navLabel,
      navOrder,
      showInFooter,
      footerLabel,
      footerOrder,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ message: 'Title and slug are required' });
    }

    const page = new StaticPage({
      title,
      slug,
      body: body || '',
      status: status || 'draft',
      seoTitle: seoTitle || '',
      seoDescription: seoDescription || '',
      seoImage: seoImage || '',
      showInNav: !!showInNav,
      navLabel: navLabel || '',
      navOrder: typeof navOrder === 'number' ? navOrder : 0,
      showInFooter: !!showInFooter,
      footerLabel: footerLabel || '',
      footerOrder: typeof footerOrder === 'number' ? footerOrder : 0,
    });

    await page.save();
    res.status(201).json(page.toObject());
  } catch (err) {
    console.error('Error creating page:', err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Slug already exists. Please choose another.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN: PUT /api/pages/admin/:id
 * Update a page
 */
router.put('/admin/:id', auth, async (req, res) => {
  try {
    const page = await StaticPage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });

    page.set(req.body);
    await page.save();
    res.json(page.toObject());
  } catch (err) {
    console.error('Error updating page:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN: DELETE /api/pages/admin/:id
 */
router.delete('/admin/:id', auth, async (req, res) => {
  try {
    const page = await StaticPage.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page.toObject());
  } catch (err) {
    console.error('Error deleting page:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUBLIC: GET /api/pages/public
 * Returns published pages with nav/footer flags for Navigation/Footer
 */
router.get('/public', async (req, res) => {
  try {
    const pages = await StaticPage.find({ status: 'published' })
      .select(
        'title slug showInNav navLabel navOrder showInFooter footerLabel footerOrder'
      )
      .lean();

    res.json({ pages });
  } catch (err) {
    console.error('Error fetching public pages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUBLIC: GET /api/pages/:slug
 * Single published page by slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const page = await StaticPage.findOne({
      slug: req.params.slug,
      status: 'published',
    }).lean();

    if (!page) return res.status(404).json({ message: 'Page not found' });

    res.json(page);
  } catch (err) {
    console.error('Error fetching page:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;