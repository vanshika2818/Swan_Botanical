// routes/wishlistRoutes.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import { toggleWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";

const router = Router();

router.get("/", auth, getWishlist);
router.post("/toggle", auth, toggleWishlist);
router.delete("/:productId", auth, removeFromWishlist);

export default router;
