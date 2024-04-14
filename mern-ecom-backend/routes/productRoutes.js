import express from "express";
const router = express.Router();

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  rateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/")
  .post(protect, admin, createProduct)
  .get(getProducts);

router.route("/rate").put(protect, rateProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
