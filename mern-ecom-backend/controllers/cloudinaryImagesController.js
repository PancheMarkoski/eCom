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
  const { id } = req.params; // 'id' is the part of the public_id following the folder name

  // Prepend the folder name to the 'id' to form the full public_id
  const fullPublicId = `images/${id}`;

  // Use the full public_id for deletion
  const deleted = await cloudinaryDeleteImg(fullPublicId);

  res.json(deleted); // Ensure you're awaiting the result of cloudinaryDeleteImg
});

export { uploadImages, deleteImages };
