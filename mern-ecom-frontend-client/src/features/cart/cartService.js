import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const addProductToCart = async (cartData) => {
  try {
    const response = await axios.post(`${base_url}user/cart/`, cartData);
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
    const response = await axios.get(`${base_url}user/cart`);
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

const updateProductQuantityFromCart = async (cartData) => {
  try {
    const response = await axios.post(
      `${base_url}user/cart-quantity-update`,
      cartData
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

const deleteCartItem = async (cartId) => {
  try {
    const modifiedConfig = {
      // ...config,
      data: cartId, // Assuming cartId is an object like { cartItemId: "someId" }
    };

    const response = await axios.delete(
      `${base_url}user/cart/item`,
      modifiedConfig
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

const cartService = {
  addProductToCart,
  getCart,
  deleteCartItem,
  updateProductQuantityFromCart,
};

export default cartService;
