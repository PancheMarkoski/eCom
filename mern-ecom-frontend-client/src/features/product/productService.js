import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getProducts = async (filters = {}) => {
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

    const response = await axios.get(`${base_url}/products/?${queryString}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const addProductToWishlist = async (productId) => {
  try {
    const response = await axios.post(
      `${base_url}/users/wishlist/`,
      {
        productId: productId,
      },
      { withCredentials: true }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${base_url}/products/${productId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
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

const createProduct = async (data) => {
  try {
    const response = await axios.post(`${base_url}/products/`, data, {
      withCredentials: true,
    });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}/products/${product.id}`,
    {
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      tags: product.tags,
      color: product.color,
      quantity: product.quantity,
      images: product.images,
    },
    { withCredentials: true }
  );

  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(
    `${base_url}/products/${productId}`,

    { withCredentials: true }
  );

  return response.data;
};

const productService = {
  getProducts,
  addProductToWishlist,
  getProductById,
  rateProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
