import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc    Add a product to the user's cart
// @route   POST /api/carts
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;

  let newCart = await new Cart({
    userId: _id,
    productId,
    color,
    quantity,
    price,
  }).save();
  res.json(newCart);
});

// @desc    Get the current user's cart items
// @route   GET /api/carts
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const cart = await Cart.find({ userId: _id })
    .populate({ path: "productId", model: "Product" })
    .populate("color");
  res.json(cart);
});

// @desc    Delete an item from the user's cart
// @route   DELETE /api/carts
// @access  Private
const deleteCartItem = asyncHandler(async (req, res) => {
  const { cartId } = req.body; // Get the cart item's ID from the request body

  const deletedItem = await Cart.findByIdAndDelete(cartId);
  if (!deletedItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  res
    .status(200)
    .json({ message: "Cart item deleted successfully", deletedItem });
});

// @desc    Update the quantity of a product in the user's cart
// @route   PUT /api/carts
// @access  Private
const updateCartItemQty = asyncHandler(async (req, res) => {
  const { cartId, newQuantity } = req.body; // Get the cart item's ID and the new quantity from the request body

  const cartItem = await Cart.findOne({ _id: cartId });
  cartItem.quantity = newQuantity;
  cartItem.save();

  res.status(200).json({
    message: "Cart product quantity successfully updated",
    cartItem,
  });
});

// @desc    Clear user cart make it empty
// @route   PUT /api/carts
// @access  Private
const clearUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  // Delete the cart items associated with the user
  await Cart.deleteMany({ userId: _id });

  res.status(200).json({ message: "Cart cleared successfully" });
});

export {
  addToCart,
  getUserCart,
  deleteCartItem,
  updateCartItemQty,
  clearUserCart,
};
