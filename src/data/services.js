// src/data/services.js

// This will later live in a real database.
// For now it's in memory.
const SERVICES = [
  {
    id: 'svc-1',
    slug: 'property-sales',
    kind: 'main',                      // 'main' | 'additional'
    icon: 'Home',                      // maps to lucide icon on frontend
    title: 'Property Sales',
    shortDescription:
      'Buy your dream home with confidence. We offer verified residential properties, premium houses, and luxury estates across Pakistan\'s top locations.',
    features: [
      'Verified Listings',
      'Legal Documentation',
      'Best Market Prices',
      'Expert Negotiation',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    commission: 'Only 1% Commission',
    color: 'from-blue-500 to-blue-600',

    // Full page content (for /services/property-sales)
    body: `
## Property Sales

We specialize in buying and selling premium residential and commercial properties in Lahore, Karachi, Islamabad and major cities across Pakistan.

### What you get

- Verified property listings
- Complete legal documentation support
- Transparent pricing and expert negotiation
- Support from visit to final transfer

![Sample property](https://images.unsplash.com/photo-1600607687920-4e2a534ab513?auto=format&fit=crop&w=1200&q=80)
    `.trim(),
  },

  {
    id: 'svc-2',
    slug: 'property-rentals',
    kind: 'main',
    icon: 'Key',
    title: 'Property Rentals',
    shortDescription:
      'Find the perfect rental property for your needs. From apartments to commercial spaces, we connect you with quality rental options.',
    features: [
      'Tenant Screening',
      'Lease Management',
      'Property Inspection',
      'Rental Collection',
    ],
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    commission: 'One Month Rent',
    color: 'from-emerald-500 to-emerald-600',
    body: '### Property Rentals\n\nLong form content goes here...',
  },

  {
    id: 'svc-3',
    slug: 'property-management',
    kind: 'main',
    icon: 'Building2',
    title: 'Property Management',
    shortDescription:
      'Hassle-free property management services. We handle everything from maintenance to tenant relations, ensuring your investment is protected.',
    features: [
      'Maintenance Services',
      'Rent Collection',
      'Tenant Management',
      'Regular Inspections',
    ],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    commission: 'Custom Plans',
    color: 'from-purple-500 to-purple-600',
    body: '### Property Management\n\nLong form content...',
  },

  {
    id: 'svc-4',
    slug: 'house-construction',
    kind: 'main',
    icon: 'Hammer',
    title: 'House Construction',
    shortDescription:
      'Build your dream home from the ground up. Our experienced team delivers quality construction with transparency and on-time completion.',
    features: ['Custom Designs', 'Quality Materials', 'Timely Completion', 'Warranty Included'],
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    commission: 'Transparent Pricing',
    color: 'from-orange-500 to-orange-600',
    body: '### House Construction\n\nLong form content...',
  },

  {
    id: 'svc-5',
    slug: 'renovation-remodelling',
    kind: 'main',
    icon: 'PaintBucket',
    title: 'Renovation & Remodeling',
    shortDescription:
      'Transform your existing space into your dream home. From kitchen upgrades to complete home makeovers, we deliver stunning results.',
    features: ['Modern Designs', 'Quality Workmanship', 'Budget Planning', 'Project Management'],
    image:
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    commission: 'Competitive Rates',
    color: 'from-pink-500 to-pink-600',
    body: '### Renovation & Remodeling\n\nLong form content...',
  },

  {
    id: 'svc-6',
    slug: 'property-valuation',
    kind: 'main',
    icon: 'ClipboardCheck',
    title: 'Property Valuation',
    shortDescription:
      'Get accurate property valuations from certified experts. Make informed decisions with professional assessment and market analysis.',
    features: ['Market Analysis', 'Certified Reports', 'Investment Advice', 'Quick Turnaround'],
    image:
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    commission: 'Free Consultation',
    color: 'from-teal-500 to-teal-600',
    body: '### Property Valuation\n\nLong form content...',
  },

  // ===== Additional services (for bottom grid) =====
  {
    id: 'svc-7',
    slug: 'mortgage-assistance',
    kind: 'additional',
    icon: 'Wallet',
    title: 'Mortgage Assistance',
    shortDescription:
      'Help securing the best home loan rates from leading banks',
    body: '### Mortgage Assistance\n\nFull page content...',
  },
  {
    id: 'svc-8',
    slug: 'legal-services',
    kind: 'additional',
    icon: 'Shield',
    title: 'Legal Services',
    shortDescription:
      'Complete legal documentation and verification support',
    body: '### Legal Services\n\nFull page content...',
  },
  {
    id: 'svc-9',
    slug: 'free-consultation',
    kind: 'additional',
    icon: 'Users',
    title: 'Free Consultation',
    shortDescription:
      'Expert advice and personalized property guidance',
    body: '### Free Consultation\n\nFull page content...',
  },
  {
    id: 'svc-10',
    slug: 'investment-planning',
    kind: 'additional',
    icon: 'FileText',
    title: 'Investment Planning',
    shortDescription:
      'Strategic investment opportunities with high ROI',
    body: '### Investment Planning\n\nFull page content...',
  },
];

module.exports = { SERVICES };