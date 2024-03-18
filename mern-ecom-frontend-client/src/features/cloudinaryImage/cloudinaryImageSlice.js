import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cloudinaryImages from "./cloudinaryImagesService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  cloudinaryImages: [],
  message: "",
};

export const uploadImages = createAsyncThunk(
  "cloudinary-images/upload-images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      const response = await cloudinaryImages.uploadImages(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "cloudinary-images/delete-images",
  async (imageId, thunkAPI) => {
    try {
      const response = await cloudinaryImages.deleteImage(imageId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const cloudinaryImage = createSlice({
  name: "cloudinaryImage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cloudinaryImages = action.payload;
        state.message = "success";
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default cloudinaryImage.reducer;
