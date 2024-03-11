import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductCategoriesService from "./ProductCategoriesService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllProductCategories = createAsyncThunk(
  "Product-Categories/Get-All-Product-Categories",
  async (thunkAPI) => {
    try {
      const response = await ProductCategoriesService.getAllProductCategories();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productCategories = createSlice({
  name: "ProductCategories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategories.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
        state.message = "success";
      })
      .addCase(getAllProductCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default productCategories.reducer;
