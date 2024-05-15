import express from "express";
import {
  createOrder,
  updateOrderStatus,
  getUserOrder,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply 'protect' middleware to all routes to ensure only authenticated users can access them
router
  .route("/")
  .get(protect, admin, getOrders) // Get the current user's cart
  .post(protect, createOrder) // Add an item to the cart
  .put(protect, admin, updateOrderStatus);

router.route("/myorders").get(protect, getUserOrder);

export default router;
