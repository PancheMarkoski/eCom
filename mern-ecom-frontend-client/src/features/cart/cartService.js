import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const addProductToCart = async (cartData) => {
  try {
    const response = await axios.post(`${base_url}/carts/`, cartData, {
      withCredentials: true,
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

const getCart = async () => {
  try {
    const response = await axios.get(`${base_url}/carts/`, {
      withCredentials: true,
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

const updateProductCartQty = async (cartData) => {
  try {
    const response = await axios.put(`${base_url}/carts/`, cartData, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCartItem = async ({ cartId }) => {
  try {
    const response = await axios.delete(`${base_url}/carts/`, {
      data: { cartId }, // Ensure cartId is directly accessible
      withCredentials: true,
    });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ??
      "Failed to delete cart item. Please try again.";
    throw new Error(errorMessage);
  }
};

const cartService = {
  addProductToCart,
  getCart,
  deleteCartItem,
  updateProductCartQty,
};

export default cartService;
