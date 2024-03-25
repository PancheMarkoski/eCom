import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const createOrder = async (completeOrderData) => {
  try {
    const response = await axios.post(
      `${base_url}/orders/`,
      completeOrderData,
      { withCredentials: true }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getUserOrders = async () => {
  try {
    const response = await axios.get(`${base_url}/orders/myorders/`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getOrders = async () => {
  try {
    const response = await axios.get(`${base_url}/orders/`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateOrderStatus = async (data) => {
  try {
    const response = await axios.put(`${base_url}/orders/`, data, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const orderService = {
  createOrder,
  getUserOrders,
  getOrders,
  updateOrderStatus,
};

export default orderService;
