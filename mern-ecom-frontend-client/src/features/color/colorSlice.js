import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      const response = await colorService.getColors();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const colors = createSlice({
  name: "colors",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
        state.message = "success";
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default colors.reducer;
