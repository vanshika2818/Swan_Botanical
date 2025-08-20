const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Gentle Botanical Cleanser",
    description: "A mild, sulfate-free cleanser with chamomile and aloe vera",
    price: 899,
    originalPrice: 1099,
    category: "cleansers",
    images: ["/images/cleanser.jpg"],
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    benefits: [
      "Gently removes impurities",
      "Maintains skin's natural moisture",
      "Suitable for all skin types"
    ],
    keyIngredients: [
      {
        name: "Chamomile Extract",
        benefit: "Soothing and calming",
        concentration: "5%"
      },
      {
        name: "Aloe Vera",
        benefit: "Hydrating and healing",
        concentration: "10%"
      }
    ],
    fullIngredients: "Aqua, Chamomile Extract, Aloe Vera Leaf Juice, Coconut Oil, Essential Oils",
    howToUse: "Apply to damp skin, massage gently, and rinse with warm water. Use morning and evening.",
    isNewProducts: true,
    isBestSeller: false
  },
  {
    name: "Vitamin C Brightening Serum",
    description: "Natural vitamin C serum for radiant skin",
    price: 1299,
    originalPrice: 1599,
    category: "serums",
    images: ["/images/serum.jpg"],
    stock: 30,
    rating: 4.9,
    reviewCount: 256,
    benefits: [
      "Brightens skin tone",
      "Reduces dark spots",
      "Boosts collagen production"
    ],
    keyIngredients: [
      {
        name: "Vitamin C",
        benefit: "Antioxidant protection",
        concentration: "15%"
      },
      {
        name: "Hyaluronic Acid",
        benefit: "Deep hydration",
        concentration: "2%"
      }
    ],
    fullIngredients: "Aqua, Vitamin C, Hyaluronic Acid, Glycerin, Essential Oils",
    howToUse: "Apply 2-3 drops to clean face morning and night",
    isNewProduct: false,
    isBestSeller: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.DB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();