import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getAllBlog = async () => {
  try {
    const response = await axios.get(`${base_url}blog/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};
const getBlog = async (blogId) => {
  try {
    const response = await axios.get(`${base_url}blog/${blogId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch blog data. Please try again.";
    throw new Error(errorMessage);
  }
};

const blogService = {
  getAllBlog,
  getBlog,
};

export default blogService;
