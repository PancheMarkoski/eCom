import express from "express";
const router = express.Router();

import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getBrands,
} from "../controllers/brandController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/")
  .post(protect, admin, createBrand)
  .get(getBrands);

router
  .route("/:id")
  .put(protect, admin, checkObjectId, updateBrand)
  .get(checkObjectId, getBrandById)
  .delete(protect, admin, checkObjectId, deleteBrand);

export default router;
