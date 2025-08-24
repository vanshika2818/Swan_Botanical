const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  images: [String],
  stock: { 
    type: Number, 
    default: 0,
    min: 0
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: { 
    type: Number, 
    default: 0 
  },
  benefits: [String],
  keyIngredients: [{
    name: String,
    benefit: String,
    concentration: String
  }],
  fullIngredients: String,
  howToUse: String,
  sizes: [{
    size: String,
    price: Number,
    originalPrice: Number
  }],
  isNewProduct: { 
    type: Boolean, 
    default: false 
  },
  isBestSeller: { 
    type: Boolean, 
    default: false 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Product", productSchema);