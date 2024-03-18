import Color from "../models/colorModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new color
// @route   POST /api/colors
// @access  Private/Admin
const createColor = asyncHandler(async (req, res) => {
  const newColor = await Color.create(req.body);
  res.json(newColor);
});

// @desc    Update an existing color
// @route   PUT /api/colors/:id
// @access  Private/Admin
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedColor);
});

// @desc    Delete a color
// @route   DELETE /api/colors/:id
// @access  Private/Admin
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedColor = await Color.findByIdAndDelete(id);
  res.json(deletedColor);
});

// @desc    Get a single color by ID
// @route   GET /api/colors/:id
// @access  Public
const getColorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const getColor = await Color.findById(id);
  res.json(getColor);
});

// @desc    Get all colors
// @route   GET /api/colors
// @access  Public
const getColors = asyncHandler(async (req, res) => {
  const allColors = await Color.find();
  res.json(allColors);
});

export { createColor, updateColor, deleteColor, getColorById, getColors };
