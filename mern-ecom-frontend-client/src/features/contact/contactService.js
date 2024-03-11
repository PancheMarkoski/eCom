import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const createEnq = async (enq) => {
  try {
    const response = await axios.post(`${base_url}enquiry/`, enq);
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

const contactService = {
  createEnq,
};

export default contactService;
