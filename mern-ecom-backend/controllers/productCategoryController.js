import ProductCategory from "../models/productCategoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const newCategory = await ProductCategory.create(req.body);
  res.json(newCategory);
});

// @desc    Update an existing category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await ProductCategory.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(updatedCategory);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await ProductCategory.findByIdAndDelete(id);

  if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(deletedCategory);
});

// @desc    Get a single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await ProductCategory.findById(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({ category });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const allCategories = await ProductCategory.find();
  res.json(allCategories);
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
};
