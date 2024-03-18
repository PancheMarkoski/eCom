import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUpload, (error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error);
        reject(error);
      } else {
        console.log("Cloudinary Upload Result:", result);
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        });
      }
    });
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileToDelete, (error, result) => {
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
