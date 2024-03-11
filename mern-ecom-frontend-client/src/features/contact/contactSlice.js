import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";

const initialState = {
  contact: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createContact = createAsyncThunk(
  "contact/get-contact",
  async (enq, thunkAPI) => {
    console.log("ENQ", enq);
    try {
      const response = await contactService.createEnq(enq);
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetState = createAction("Reset_all");

const contactSlice = createSlice({
  name: "Contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
        state.message = "success";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
