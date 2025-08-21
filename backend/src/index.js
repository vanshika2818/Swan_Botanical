require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", service: "Swan Botanicals API" });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Swan Botanicals API",
    endpoints: {
      auth: "/api/auth",
      products: "/api/products",
      health: "/api/health"
    }
  });
});

// DB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/swan-botanicals")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ DB Error:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
