import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    // Use Cloudinary's upload_stream method for buffer upload
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "images" }, // Specify your Cloudinary folder path here
      (error, result) => {
        if (error) reject(error);
        else
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
      }
    );

    // Write the buffer to the upload stream
    uploadStream.end(fileBuffer);
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  console.log("fileToDelete", fileToDelete);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileToDelete, (error, result) => {
      console.log("result", result);
      if (error) {
        console.error("Cloudinary Delete Error:", error);
        reject(error);
      } else {
        resolve({
          result: result,
        });
      }
    });
  });
};

export { cloudinaryUploadImg, cloudinaryDeleteImg };
