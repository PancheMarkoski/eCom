import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getColors = async () => {
  try {
    const response = await axios.get(`${base_url}/colors/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getColorById = async (id) => {
  try {
    const response = await axios.get(`${base_url}/colors/${id}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const createColor = async (data) => {
  try {
    const response = await axios.post(`${base_url}/colors/`, data, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateColor = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}/colors/${data.id}`,
      { title: data.title },
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

const deleteColor = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/colors/${id}`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const ColorService = {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
};

export default ColorService;
