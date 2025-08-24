const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    
    // Generate SKU if not provided
    if (!product.sku) {
      product.sku = `SWAN-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    }
    
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A product with this SKU already exists.' });
    }
    // Handle other errors
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error creating product', error: error.message });
  }
};

// Update product (Admin only) - Add this for completeness
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product (Admin only) - Soft delete
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};