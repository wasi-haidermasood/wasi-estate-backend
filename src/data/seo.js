// src/data/seo.js

const SEO_CONFIG = {
  meta: {
    title:
      "Wasi Marketing Solutions - Digital Marketing Agency | SEO, Social Media & Web Development",
    description:
      "Transform your business with Wasi Marketing Solutions. Expert digital marketing services including SEO, social media marketing, web development, and PPC advertising. Drive growth and maximize ROI.",
    keywords:
      "digital marketing, SEO, social media marketing, web development, PPC advertising, content marketing, brand strategy, digital agency",
    author: "Wasi Marketing Solutions",
    canonicalUrl: "https://wasimarketingsolutions.com",
  },
  openGraph: {
    ogType: "website", // <--- changed from type -> ogType
    title: "Wasi Marketing Solutions - Digital Marketing Agency",
    description:
      "Transform your business with expert digital marketing services. SEO, social media, web development & more.",
    image: "https://wasimarketingsolutions.com/og-image.jpg",
    url: "https://wasimarketingsolutions.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wasi Marketing Solutions - Digital Marketing Agency",
    description:
      "Transform your business with expert digital marketing services. SEO, social media, web development & more.",
    image: "https://wasimarketingsolutions.com/og-image.jpg",
  },
  structuredData: JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wasi Marketing Solutions",
      "description":
        "Digital marketing agency specializing in SEO, social media marketing, web development, and PPC advertising",
      "url": "https://wasimarketingsolutions.com",
      "logo": "https://wasimarketingsolutions.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "customer service",
      },
      "sameAs": [
        "https://facebook.com/wasimarketingsolutions",
        "https://twitter.com/wasimarketing",
        "https://linkedin.com/company/wasi-marketing-solutions",
      ],
    },
    null,
    2
  ),
};

module.exports = { SEO_CONFIG };