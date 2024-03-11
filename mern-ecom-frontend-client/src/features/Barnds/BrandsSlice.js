import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BrandsService from "./BrandsService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBrands = createAsyncThunk(
  "Brand/Get-Brands",
  async (thunkAPI) => {
    try {
      const response = await BrandsService.getBrands();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const brands = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
        state.message = "success";
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default brands.reducer;
