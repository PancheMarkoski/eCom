import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getAllProducts = async (filters = {}) => {
  try {
    // Construct query string from filters object
    const queryString = Object.keys(filters)
      .map((key) => {
        if (typeof filters[key] === "object") {
          // For nested objects like price[gte] or price[lte]
          return Object.keys(filters[key])
            .map((innerKey) => `${key}[${innerKey}]=${filters[key][innerKey]}`)
            .join("&");
        }
        return `${key}=${filters[key]}`;
      })
      .join("&");

    const response = await axios.get(`${base_url}product/?${queryString}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch products. Please try again.";
    throw new Error(errorMessage);
  }
};

const addProductToWishlist = async (productId) => {
  try {
    const response = await axios.put(`${base_url}product/wishlist`, {
      prodId: productId,
    });
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

const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${base_url}product/${productId}`);
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

const rateProduct = async (rateProductData) => {
  try {
    const response = await axios.put(
      `${base_url}product/rating`,
      rateProductData
    );
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

const productService = {
  getAllProducts,
  addProductToWishlist,
  getProduct,
  rateProduct,
};

export default productService;
