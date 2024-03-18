import fs from "fs";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} from "../utils/cloudinary.js";

const uploadImages = asyncHandler(async (req, res) => {
  const uploader = (path) => cloudinaryUploadImg(path, "images");

  const urls = [];

  console.log("req.files", req.files);
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const newpath = await uploader(path);
    console.log(newpath);
    urls.push(newpath);

    // Delete the local file after it's been uploaded to Cloudinary
    fs.unlink(path, (err) => {
      if (err) {
        console.error("Error deleting file:", path, err);
      } else {
        console.log("Successfully deleted file:", path);
      }
    });
  }

  const images = urls.map((file) => {
    return file;
  });

  res.json(images);
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = cloudinaryDeleteImg(id, "images");

  res.json({ message: "Deleted" });
});

export { uploadImages, deleteImages };
