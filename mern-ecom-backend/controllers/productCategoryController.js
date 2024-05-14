import ProductCategory from "../models/productCategoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  // Simple validation check
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Invalid title. Title must be a non-empty string." });
  }

  try {
    const newCategory = await ProductCategory.create({ title: title.trim() });
    res.json(newCategory);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "Category already exists. Please use a different name.",
      });
    } else {
      console.error(
        `Error occurred during category creation: ${error.message}`
      );
      res.status(500).json({
        message: `Failed to create category. Error: ${error.message}`,
      });
    }
  }
});

// @desc    Update an existing category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // Server-side validation for title
  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Invalid title. Title must be a non-empty string." });
  }

  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      { title: title.trim() }, // Updating only the title, and trimming any whitespace
      { new: true, runValidators: true }
    ).lean();

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category title must be unique" });
    }
    throw error;
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // First, attempt to find the category to ensure it exists and possibly to check additional constraints
  const category = await ProductCategory.findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Perform any needed checks here, for example, if the category is in use <<NEED TO BE DONE>>

  const deletedCategory = await ProductCategory.findByIdAndDelete(id);

  if (!deletedCategory) {
    console.error(`Failed to delete category with id: ${id}`);
    return res.status(500).json({ message: "Failed to delete the category" });
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
  res.status(200).json(allCategories);
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
};
