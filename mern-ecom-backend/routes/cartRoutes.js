import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItemQty,
  deleteCartItem,
  clearUserCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply 'protect' middleware to all routes to ensure only authenticated users can access them
router
  .route("/")
  .get(protect, getUserCart) // Get the current user's cart
  .post(protect, addToCart) // Add an item to the cart
  .delete(protect, deleteCartItem) // Remove an item from the cart
  .put(protect, updateCartItemQty);

router.post("/clear-cart", protect, clearUserCart);

export default router;
