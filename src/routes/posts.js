const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * ADMIN: GET /api/posts/admin
 * List all posts (draft + published)
 */
router.get('/admin', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching admin posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN: POST /api/posts
 * Create a new post
 * Body: {
 *   title, slug, excerpt, body, coverImage, category,
 *   tags, status,
 *   seoTitle, seoDescription, seoImage
 * }
 */
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      body,
      coverImage,
      category,
      tags,
      status,
      // NEW SEO fields
      seoTitle,
      seoDescription,
      seoImage,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ message: 'Title and slug are required' });
    }

    const post = new Post({
      title,
      slug,
      excerpt: excerpt || '',
      body: body || '',
      coverImage: coverImage || '',
      category: category || '',
      tags: Array.isArray(tags) ? tags : [],
      status: status || 'draft',

      // NEW: SEO fields
      seoTitle: seoTitle || '',
      seoDescription: seoDescription || '',
      seoImage: seoImage || '',
    });

    if (post.status === 'published' && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();
    res.status(201).json(post.toObject());
  } catch (err) {
    console.error('Error creating post:', err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Slug already exists. Please choose another.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN: PUT /api/posts/:id
 * Update a post
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const wasDraft = post.status !== 'published';

    // This will also update seoTitle, seoDescription, seoImage if provided
    post.set(req.body);

    // If moved from draft -> published, set publishedAt
    if (post.status === 'published' && wasDraft && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();
    res.json(post.toObject());
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ADMIN: DELETE /api/posts/:id
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post.toObject());
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUBLIC: GET /api/posts
 * List published posts
 * Optional query: ?tag=...&search=...
 */
router.get('/', async (req, res) => {
  try {
    const { tag, search } = req.query;

    const filter = { status: 'published' };
    if (tag) filter.tags = tag;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const posts = await Post.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUBLIC: GET /api/posts/:slug
 * Single published post by slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      status: 'published',
    }).lean();

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;