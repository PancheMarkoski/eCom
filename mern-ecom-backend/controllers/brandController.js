// Brand Controller

// Importing necessary modules
import Brand from "../models/brandModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new brand
// @route   POST /api/brands/
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);
  res.json(brand);
});

// @desc    Update brand by ID
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedBrand);
});

// @desc    Delete brand by ID
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Brand.findByIdAndDelete(id);
  res.status(204).json({ message: "Brand deleted" });
});

// @desc    Get a single brand by ID
// @route   GET /api/brands/:id
// @access  Public
const getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  res.json(brand);
});

// @desc    Get all brands
// @route   GET /api/brands/
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
});

// Exporting controller functions
export { createBrand, updateBrand, deleteBrand, getBrandById, getBrands };
