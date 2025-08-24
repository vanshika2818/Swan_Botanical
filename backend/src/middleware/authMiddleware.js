const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  try {
    console.log("🔄 Auth middleware called");
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    // DEBUG: Check if .env is loaded
    console.log("🔐 JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("🔐 Token received:", token ? "Yes" : "No");

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded successfully");
    console.log("👤 User ID from token:", decoded.userId);
    
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    console.log("👤 User found:", user.email);
    console.log("👑 Admin status:", user.isAdmin);
    
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    res.status(401).json({ error: "Invalid token signature" });
  }
};

exports.admin = (req, res, next) => {
  console.log("Checking admin status for user:", req.user?.email);
  
  if (req.user && req.user.isAdmin) {
    console.log("User is admin, proceeding...");
    next();
  } else {
    console.log("User is NOT admin. Access denied.");
    res.status(403).json({ error: "Not authorized as an admin" });
  }
};