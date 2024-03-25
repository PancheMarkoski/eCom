import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new order for the user
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, totalPrice, priceAfterDiscount } = req.body;
  const { _id } = req.user;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    totalPrice,
    priceAfterDiscount,
    user: _id,
  });
  res.json(order);
});

// @desc    Update the status of an existing order
// @route   PUT /api/orders
// @access  Private
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body; // Extract orderId and status from the request body

  // Find the order by ID
  const order = await Order.findById(orderId);

  if (order) {
    order.orderStatus = status; // Update the order status
    const updatedOrder = await order.save(); // Save the updated order

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Retrieve orders for the logged-in user
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const orders = await Order.find({ user: id })
    .populate("user")
    .populate("orderItems.product")
    .populate("orderItems.color");
  res.json(orders);
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user")
    .populate("orderItems.product")
    .populate("orderItems.color");

  res.json(orders);
});

export { createOrder, updateOrderStatus, getUserOrder, getOrders };
