const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  category: String,
  subcategory: String,
  images: [String],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
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
  isNewProduct: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
