import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const createOrder = async (completeOrderData) => {
  try {
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      completeOrderData
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

const getUserOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/get-user-orders`);
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

const orderService = {
  createOrder,
  getUserOrders,
};

export default orderService;
