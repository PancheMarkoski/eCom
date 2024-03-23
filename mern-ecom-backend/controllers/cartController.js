import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// User Cart
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

// Get User Cart
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const cart = await Cart.find({ userId: _id })
    .populate({ path: "productId", model: "Product" })
    .populate("color");
  res.json(cart);
});

// Delete item from the cart
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

// Update Product Quantity In Cart
const updateCartItemQty = asyncHandler(async (req, res) => {
  const { cartId, newQuantity } = req.body; // Get the cart item's ID from the request body

  const cartItem = await Cart.findOne({ _id: cartId });
  cartItem.quantity = newQuantity;
  cartItem.save();

  res.status(200).json({
    message: "Cart product quantity successfully updated",
    cartItem,
  });
});

export { addToCart, getUserCart, deleteCartItem, updateCartItemQty };
