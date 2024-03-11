import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createOrder = createAsyncThunk(
  "order/create-order",
  async (completeOrderData, thunkAPI) => {
    try {
      const response = await orderService.createOrder(completeOrderData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUserOrders = createAsyncThunk(
  "order/get-user-orders",
  async (thunkAPI) => {
    try {
      const response = await orderService.getUserOrders();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "Order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createdOrder = action.payload;
        state.message = "success";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userOrders = action.payload;
        state.message = "success";
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
