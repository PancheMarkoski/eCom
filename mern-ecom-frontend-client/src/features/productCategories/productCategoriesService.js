import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getProductCategories = async () => {
  try {
    const response = await axios.get(`${base_url}/product-categories/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getProductCategoryById = async (id) => {
  try {
    const response = await axios.get(`${base_url}/product-categories/${id}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const createProductCategory = async (data) => {
  try {
    const response = await axios.post(`${base_url}/product-categories/`, data, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateProductCategory = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}/product-categories/${data.id}`,
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

const deleteProductCategory = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}/product-categories/${id}`,
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

const ProductCategoriesService = {
  getProductCategories,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default ProductCategoriesService;
