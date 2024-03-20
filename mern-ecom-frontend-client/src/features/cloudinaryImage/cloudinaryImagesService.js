import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const uploadImages = async (data) => {
  try {
    const response = await axios.post(`${base_url}/cloudinary-images/`, data, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const deleteImage = async (imageId) => {
  const imageName = imageId.split("/").pop();

  try {
    const response = await axios.delete(
      `${base_url}/cloudinary-images/${imageName}`,
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const cloudinaryImagesService = {
  uploadImages,
  deleteImage,
};

export default cloudinaryImagesService;
