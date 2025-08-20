const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  subcategory: { type: String },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  benefits: [{ type: String }],
  keyIngredients: [{
    name: String,
    benefit: String,
    concentration: String
  }],
  fullIngredients: { type: String },
  howToUse: { type: String },
  sizes: [{
    size: String,
    price: Number,
    originalPrice: Number
  }],
  isNewProduct: { type: Boolean, default: false }, // Changed from isNew to isNewProduct
  isBestSeller: { type: Boolean, default: false }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true // Suppress the warning
});

module.exports = mongoose.model('Product', productSchema);