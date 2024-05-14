import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
import { getUserWishlist } from "../user/userSlice";

const initialState = {
  products: [],
  wishlist: [],
  createdProduct: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "products/get-products",
  async (filters, thunkAPI) => {
    try {
      const response = await productService.getProducts(filters);
      return response;
    } catch (error) {
      toast.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/get-product",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getProductById(productId);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const rateProduct = createAsyncThunk(
  "products/rate-product",
  async (rateProductData, thunkAPI) => {
    try {
      const response = await productService.rateProduct(rateProductData);
      thunkAPI.dispatch(getProductById(rateProductData.prodId));
      return response;
    } catch (error) {
      // toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create-product",
  async (data, thunkAPI) => {
    try {
      const response = await productService.createProduct(data);
      return response;
    } catch (error) {
      toast.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update-product",
  async (data, thunkAPI) => {
    try {
      const response = await productService.updateProduct(data);
      // thunkAPI.dispatch(getProductById(rateProductData.prodId));
      return response;
    } catch (error) {
      toast.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete-product",
  async (productId, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(productId);
      // thunkAPI.dispatch(getProductById(rateProductData.prodId));
      return response;
    } catch (error) {
      toast.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.message = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
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
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "success";
      })
      .addCase(getProductById.rejected, (state, action) => {
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
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
        state.message = "success";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        // state.createdProduct = action.payload;
        state.message = "success";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
        state.products = state.products.filter(
          (product) => product._id !== action.meta.arg
        );
        state.message = "success";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
