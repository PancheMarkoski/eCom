import asyncHandler from "../middleware/asyncHandler.js";
import PromotedProduct from "../models/promotedProductModel.js";

// @desc    GET all promoted products
// @route   GET /api/promote/:id
// @access  Private/Admin
const getPromotedProducts = asyncHandler(async (req, res) => {
  // Fetch all promoted products without filtering by promoType
  const promotedProducts = await PromotedProduct.find()
    .populate("product") // Assuming you want to include the product details
    .exec();

  // If there are no promoted products found, return an empty array
  if (!promotedProducts.length) {
    return res.status(404).json({ message: "No promoted products found." });
  }

  res.status(200).json(promotedProducts);
});

// @desc    Promote a product from promoted product
// @route   POST /api/promote/:id
// @access  Private/Admin
const promoteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { promoImage, promoTag, promoType } = req.body;

  // Check for active promotions limits
  const mainPromoCount = await PromotedProduct.countDocuments({
    promoType: "main",
  });
  const famousPromoCount = await PromotedProduct.countDocuments({
    promoType: "famous",
  });

  if (promoType === "main" && mainPromoCount >= 5) {
    return res
      .status(400)
      .json({ message: "Limit of 5 main promotions reached." });
  }

  if (promoType === "famous" && famousPromoCount >= 4) {
    return res
      .status(400)
      .json({ message: "Limit of 4 famous promotions reached." });
  }

  // Create a new promoted product
  const promotedProduct = new PromotedProduct({
    product: productId,
    promoImage,
    promoTag,
    promoType,
  });

  await promotedProduct.save();

  const populatedPromotedProduct = await PromotedProduct.findById(
    promotedProduct._id
  ).populate("product"); // You might need to adjust the path 'product' if your schema uses a different field name

  if (!populatedPromotedProduct) {
    return res
      .status(404)
      .json({ message: "Promoted product not found after saving." });
  }

  res.status(201).json(populatedPromotedProduct);
});

// @desc    Demote a product from promoted product
// @route   DELETE /api/demote/:id/
// @access  Private/Admin
const demoteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Find and remove the promoted product entry
  const result = await PromotedProduct.findOneAndDelete({ product: productId });

  if (!result) {
    res.status(404);
    throw new Error("Promoted product not found");
  }

  res.status(200).json({ message: "Product has been demoted successfully." });
});

// @desc    Update a product from promoted product
// @route   PUT /api/demote/:id/
// @access  Private/Admin
const updatePromotedProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { promoImage, promoTag, promoType } = req.body;

  // First, fetch the current promotion to check its existing promoType
  const currentPromotion = await PromotedProduct.findOne({
    product: productId,
  });

  if (!currentPromotion) {
    res.status(404);
    throw new Error("Promoted product not found");
  }

  // If changing the promoType to 'main', check the count, but only if it's a change
  if (promoType === "main" && promoType !== currentPromotion.promoType) {
    const promoCount = await PromotedProduct.countDocuments({ promoType });

    // Consider the existing 'main' promotions excluding the current one
    const maxCount = 5;
    if (promoCount >= maxCount) {
      return res.status(400).json({
        message: `Limit of ${maxCount} ${promoType} promotions reached.`,
      });
    }
  }

  // Update the promotion with new details
  const updatedPromotedProduct = await PromotedProduct.findOneAndUpdate(
    { product: productId },
    { promoImage, promoTag, promoType },
    { new: true, runValidators: true }
  ).populate("product");

  res.status(200).json(updatedPromotedProduct);
});

// @desc    Update theme for a promoted product
// @route   PUT /api/promote/theme/:id
// @access  Private/Admin
const updatePromotedProductTheme = asyncHandler(async (req, res) => {
  const { theme } = req.body; // Get the new theme from request body
  const productId = req.params.id; // Get the product id from the URL parameter

  // Validate the incoming theme value
  if (!["dark", "light"].includes(theme)) {
    res.status(400);
    throw new Error("Invalid theme value. Must be 'dark' or 'light'.");
  }

  // Find the promoted product by ID, update its theme, and return the updated document
  const promotedProduct = await PromotedProduct.findByIdAndUpdate(
    productId,
    { theme: theme },
    { new: true, runValidators: true }
  ).populate("product");

  if (!promotedProduct) {
    res.status(404).send("Promoted product not found");
    return;
  }

  res.status(200).json(promotedProduct);
});

export {
  getPromotedProducts,
  promoteProduct,
  demoteProduct,
  updatePromotedProduct,
  updatePromotedProductTheme,
};
