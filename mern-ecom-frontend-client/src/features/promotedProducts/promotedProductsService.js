import axios from "axios";
import { base_url } from "../../utils/baseUrl";

// Fetch all promoted products
const getPromotedProducts = async () => {
  const response = await axios.get(`${base_url}/promote/`);
  return response.data;
};

// Promote a product
const promoteProduct = async (productData) => {
  const response = await axios.post(
    `${base_url}/promote/${productData.promoteProductId}`,
    {
      promoImage: productData.promoImage,
      promoTag: productData.promoTag,
      promoType: productData.promoType,
    },
    { withCredentials: true }
  );
  return response.data;
};

// Update a promoted product
const updatePromotedProduct = async (productData) => {
  const response = await axios.put(
    `${base_url}/promote/${productData.promoteProductId}`,
    {
      promoImage: productData.promoImage,
      promoTag: productData.promoTag,
      promoType: productData.promoType,
    },
    { withCredentials: true }
  );
  return response.data;
};

// Demote a product
const demoteProduct = async (productId) => {
  const response = await axios.delete(`${base_url}/promote/${productId}`, {
    withCredentials: true,
  });
  return response.data;
};

const promotedProductService = {
  getPromotedProducts,
  promoteProduct,
  updatePromotedProduct,
  demoteProduct,
};

export default promotedProductService;
