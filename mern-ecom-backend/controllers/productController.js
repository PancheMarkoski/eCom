import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import slugify from "slugify";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("color")
    .populate("ratings.postedBy");

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  //  Filtering

  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));

  //  Sorting

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //  Limiting the fields

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  //  Pagination

  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const productCount = await Product.countDocuments();
    if (skip >= productCount) throw new Error("This page does not exists");
  }

  const product = await query;

  res.json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await Product.findByIdAndDelete(id);
  res.json(deleteProduct);
});

// @desc    Rate a product
// @route   PUT /api/products/rate
// @access  Private
const rateProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  const product = await Product.findById(prodId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let alreadyRated = product.ratings.find(
    (userId) => userId.postedBy.toString() === _id.toString()
  );

  if (alreadyRated) {
    const updateRating = await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRated },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    const rateProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedBy: _id,
          },
        },
      },
      { new: true }
    );
  }

  // Calculate Total Rating
  const getallratings = await Product.findById(prodId);

  let totalRating = getallratings.ratings.length;
  let ratingsum = getallratings.ratings
    .map((item) => item.star)
    .reduce((prev, curr) => prev + curr, 0);
  let actualRating = Math.round(ratingsum / totalRating);
  let finalproduct = await Product.findByIdAndUpdate(
    prodId,
    {
      totalRating: actualRating,
    },
    { new: true }
  );
  res.json(finalproduct);
});

export {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  rateProduct,
};
