import express from "express";
const router = express.Router();

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
} from "../controllers/productCategoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/")
  .post(protect, admin, createCategory)
  .get(getCategories);

router
  .route("/:id")
  .put(protect, admin, checkObjectId, updateCategory)
  .get(checkObjectId, getCategoryById)
  .delete(protect, admin, checkObjectId, deleteCategory);

export default router;
