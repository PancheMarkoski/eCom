import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import promotedProductService from "./promotedProductsService";

const initialState = {
  promotedProducts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Async thunk for fetching promoted products
export const getPromotedProducts = createAsyncThunk(
  "promotedProducts/getAll",
  async (_, thunkAPI) => {
    try {
      return await promotedProductService.getPromotedProducts();
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for promoting a product
export const promoteProduct = createAsyncThunk(
  "promotedProducts/promote",
  async (productData, thunkAPI) => {
    try {
      return await promotedProductService.promoteProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a promoted product
export const updatePromotedProduct = createAsyncThunk(
  "promotedProducts/update",
  async (productData, thunkAPI) => {
    try {
      return await promotedProductService.updatePromotedProduct(productData);
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for demoting a product
export const demoteProduct = createAsyncThunk(
  "promotedProducts/demote",
  async (productId, thunkAPI) => {
    try {
      return await promotedProductService.demoteProduct(productId);
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for updating a promoted product's theme
export const updatePromotedProductTheme = createAsyncThunk(
  "promotedProducts/updateTheme",
  async ({ promotedProductId, theme }, thunkAPI) => {
    try {
      return await promotedProductService.updatePromotedProductTheme(
        promotedProductId,
        theme
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const promotedProductSlice = createSlice({
  name: "promotedProduct",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getPromotedProducts async thunk
      .addCase(getPromotedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromotedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.promotedProducts = action.payload;
      })
      .addCase(getPromotedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle promoteProduct async thunk
      .addCase(promoteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(promoteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Add the new promoted product to the state
        state.promotedProducts.push(action.payload);
      })
      .addCase(promoteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle updatePromotedProduct async thunk
      .addCase(updatePromotedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePromotedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Find the index of the product that was updated
        const index = state.promotedProducts.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          // Replace the old product data with the updated one
          state.promotedProducts[index] = action.payload;
        }
      })
      .addCase(updatePromotedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Handle demoteProduct async thunk
      .addCase(demoteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(demoteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove the demoted product from the state
        state.promotedProducts = state.promotedProducts.filter(
          (promotedItem) => promotedItem.product._id !== action.meta.arg
        );
      })
      .addCase(demoteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePromotedProductTheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePromotedProductTheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.promotedProducts.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.promotedProducts[index] = action.payload; // Update the theme of the product
        }
      })
      .addCase(updatePromotedProductTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = promotedProductSlice.actions;
export default promotedProductSlice.reducer;
