import express from "express";
const router = express.Router();

import {
  createColor,
  updateColor,
  deleteColor,
  getColorById,
  getColors,
} from "../controllers/colorController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/")
  .post(protect, admin, createColor)
  .get(getColors);

router
  .route("/:id")
  .put(protect, admin, checkObjectId, updateColor)
  .get(checkObjectId, getColorById)
  .delete(protect, admin, checkObjectId, deleteColor);

export default router;
