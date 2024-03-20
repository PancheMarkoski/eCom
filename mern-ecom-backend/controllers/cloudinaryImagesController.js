import fs from "fs";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} from "../utils/cloudinary.js";

const uploadImages = asyncHandler(async (req, res) => {
  const urls = [];

  for (const file of req.files) {
    const { buffer } = file; // Get the file buffer
    const newPath = await cloudinaryUploadImg(buffer); // Adjusted to accept a buffer
    urls.push(newPath);
  }

  res.json(urls);
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = cloudinaryDeleteImg(id, "images");

  res.json({ message: "Deleted" });
});

export { uploadImages, deleteImages };
