const express = require("express");
const { 
  getAllProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct 
} = require("../controllers/productController");
const { authenticate, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin routes - protected and require admin privileges
router.post("/", authenticate, admin, createProduct);
router.put("/:id", authenticate, admin, updateProduct);
router.delete("/:id", authenticate, admin, deleteProduct);

module.exports = router;