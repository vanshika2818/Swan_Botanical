// controllers/wishlistController.js
import User from "../models/User.js";
import Product from "../models/Product.js";

// POST /api/wishlist/toggle { productId }
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "productId required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const already = user.wishlist.find(
      (id) => id.toString() === productId.toString()
    );

    if (already) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId.toString()
      );
    } else {
      // ensure product exists (optional but recommended)
      const exists = await Product.exists({ _id: productId });
      if (!exists) return res.status(404).json({ message: "Product not found" });
      user.wishlist.push(productId);
    }

    await user.save();
    const populated = await user.populate("wishlist");
    return res.json({ wishlist: populated.wishlist });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// GET /api/wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    return res.json(user?.wishlist || []);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// DELETE /api/wishlist/:productId
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId.toString()
    );
    await user.save();

    const populated = await user.populate("wishlist");
    return res.json({ wishlist: populated.wishlist });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
