require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const propertiesRouter = require('./routes/properties');
const heroRouter = require('./routes/hero');
const servicesRouter = require('./routes/services');
const testimonialsRouter = require('./routes/testimonials');
const aboutRouter = require('./routes/about');
const footerRouter = require('./routes/footer');
const contactRouter = require('./routes/contact');
const navigationRouter = require('./routes/navigation');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const seoRouter = require('./routes/seo');
const servicesSettingsRouter = require('./routes/servicesSettings');
const pagesRouter = require('./routes/pages');
const sitemapRouter = require('./routes/sitemap');
const { router: siteSettingsRouter } = require('./routes/siteSettings');
const seoPublicRouter = require('./routes/seoPublic');




const app = express();

console.log('JWT_SECRET value:', process.env.JWT_SECRET);

// 1) Middlewares
const allowedOrigins = [
  'http://localhost:8080',             // dev frontend
  'https://wasi-estate.vercel.app/',  // production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow tools like curl/Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
}));

app.use(express.json()); // <-- this MUST be before app.use('/api/auth', ...)

// 2) DB
connectDB();

// 3) Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/auth', authRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/hero', heroRouter);
app.use('/api/services', servicesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/about', aboutRouter);
app.use('/api/footer', footerRouter);
app.use('/api/contact', contactRouter);
app.use('/api/navigation', navigationRouter);
app.use('/api/posts', postsRouter);
app.use('/api/seo', seoRouter);
app.use('/api/services-settings', servicesSettingsRouter);
app.use('/api/pages', pagesRouter);
app.use('/', sitemapRouter); // serves /sitemap.xml
app.use('/api/site-settings', siteSettingsRouter);
app.use('/', seoPublicRouter); // handles /robots.txt and /sitemap.xml




// 4) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});