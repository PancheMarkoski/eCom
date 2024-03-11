import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
import { getUserWishlist } from "../user/userSlice";

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllProducts = createAsyncThunk(
  "products/get-products",
  async (filters, thunkAPI) => {
    try {
      const response = await productService.getAllProducts(filters);
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get-product",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getProduct(productId);
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "products/wishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.addProductToWishlist(productId);
      thunkAPI.dispatch(getUserWishlist());
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rateProduct = createAsyncThunk(
  "products/rate-product",
  async (rateProductData, thunkAPI) => {
    try {
      const response = await productService.rateProduct(rateProductData);
      thunkAPI.dispatch(getProduct(rateProductData.prodId));
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.message = "success";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = "success";
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "success";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.rateProduct = action.payload;
        state.message = "success";
      })
      .addCase(rateProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
