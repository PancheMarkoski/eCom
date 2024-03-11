import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getBrands = async () => {
  try {
    const response = await axios.get(`${base_url}brand/`);
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

const BrandService = {
  getBrands,
};

export default BrandService;
