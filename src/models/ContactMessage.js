// src/models/ContactMessage.js
const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    propertyType: String,
    budget: String,
    message: String,
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);