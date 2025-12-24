// src/data/properties.js

const PROPERTIES = [
  {
    id: 'prop-1',
    title: '1 Kanal Luxury House – Modern Elevation',
    city: 'Lahore',
    location: 'DHA Phase 6',
    type: 'House',
    transactionType: 'buy',      // buy | rent | projects
    price: 95000000,             // PKR
    beds: 5,
    baths: 6,
    area: '1 Kanal',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a534ab513?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prop-2',
    title: '10 Marla Brand New House – Ideal for Families',
    city: 'Lahore',
    location: 'Bahria Town',
    type: 'House',
    transactionType: 'buy',
    price: 42500000,
    beds: 4,
    baths: 5,
    area: '10 Marla',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a534ab513?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prop-3',
    title: 'Prime Commercial Office – Main Boulevard',
    city: 'Lahore',
    location: 'Gulberg',
    type: 'Commercial',
    transactionType: 'rent',
    price: 350000,               // monthly rent
    area: '2,000 sq.ft',
    image:
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prop-4',
    title: 'New High-Rise Apartments – E-11 Islamabad',
    city: 'Islamabad',
    location: 'E-11',
    type: 'Apartment',
    transactionType: 'projects',
    price: 18000000,
    beds: 3,
    baths: 3,
    area: '1,200 sq.ft',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  },
];

module.exports = { PROPERTIES };