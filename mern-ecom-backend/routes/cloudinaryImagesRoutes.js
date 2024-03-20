import express from "express";
const router = express.Router();

import {
  uploadImages,
  deleteImages,
} from "../controllers/cloudinaryImagesController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { uploadPhoto } from "../middleware/uploadImage.js";

router
  .route("/")
  .post(protect, admin, uploadPhoto.array("images", 10), uploadImages);

router.route("/:id").delete(protect, admin, deleteImages);

export default router;
