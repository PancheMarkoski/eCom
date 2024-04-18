import mongoose from "mongoose";

const promotedProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    promoImage: {
      type: String, // Assuming the image is stored as a URL; adjust based on your storage method
      required: true,
    },
    promoTag: {
      type: String,
      required: true,
    },
    promoType: {
      type: String,
      required: true,
      enum: ["main", "famous"], // Restricts the promo type to either 'main' or 'famous'
    },
    theme: {
      type: String,
      enum: ["dark", "light"], // Only allow 'dark' or 'light' themes
      default: "dark", // Default to 'dark' if not specified
    },
  },
  { timestamps: true }
);

const PromotedProduct = mongoose.model(
  "PromotedProduct",
  promotedProductSchema
);
export default PromotedProduct;
