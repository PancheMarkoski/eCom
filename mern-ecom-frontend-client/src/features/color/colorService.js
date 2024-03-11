import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getColors = async () => {
  try {
    const response = await axios.get(`${base_url}color/`);
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

const ColorService = {
  getColors,
};

export default ColorService;
