import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { toast } from "react-toastify";

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllBlogs = createAsyncThunk(
  "blogs/get-blogs",
  async (thunkAPI) => {
    try {
      const response = await blogService.getAllBlog();
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/get-blog",
  async (blogId, thunkAPI) => {
    try {
      const response = await blogService.getBlog(blogId);
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
        state.message = "success";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
        state.message = "success";
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default blogSlice.reducer;
