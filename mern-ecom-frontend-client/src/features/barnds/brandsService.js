import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getBrands = async () => {
  try {
    const response = await axios.get(`${base_url}/brands/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getBrandById = async (brandId) => {
  try {
    const response = await axios.get(`${base_url}/brands/${brandId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const createBrand = async (data) => {
  try {
    const response = await axios.post(`${base_url}/brands/`, data, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const updateBrand = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}/brands/${data.id}`,
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

const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(`${base_url}/brands/${brandId}`, {
      withCredentials: true,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const BrandService = {
  getBrands,
  getBrandById,
  createBrand,
  deleteBrand,
  updateBrand,
};

export default BrandService;
