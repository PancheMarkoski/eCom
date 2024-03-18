import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductCategoriesService from "./productCategoriesService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  productCategories: [],
  productCategory: {},
  message: "",
};

export const getProductCategories = createAsyncThunk(
  "Product-Categories/Get-All-Product-Categories",
  async (thunkAPI) => {
    try {
      const response = await ProductCategoriesService.getProductCategories();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductCategoryById = createAsyncThunk(
  "ProductCategory/Get-Product-Category-by-id",
  async (id, thunkAPI) => {
    try {
      const response = await ProductCategoriesService.getProductCategoryById(
        id
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "ProductCategory/Create-Product-Category",
  async (data, thunkAPI) => {
    try {
      const response = await ProductCategoriesService.createProductCategory(
        data
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "ProductCategory/Update-Product-Category",
  async (data, thunkAPI) => {
    try {
      const response = await ProductCategoriesService.updateProductCategory(
        data
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "ProductCategory/Delete-Product-Category",
  async (id, thunkAPI) => {
    try {
      const response = await ProductCategoriesService.deleteProductCategory(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productCategories = createSlice({
  name: "ProductCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
        state.message = "success";
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategoryById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategory = action.payload;
        state.message = "success";
      })
      .addCase(getProductCategoryById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdProductCategory = action.payload;
        state.message = "success";
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updateProductCategory = action.payload;
        state.message = "success";
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteProductCategory = action.payload;
        state.productCategories = state.productCategories.filter(
          (brand) => brand._id !== action.meta.arg
        );
        state.message = "success";
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default productCategories.reducer;
