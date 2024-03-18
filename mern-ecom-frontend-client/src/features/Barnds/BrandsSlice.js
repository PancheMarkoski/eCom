import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BrandsService from "./brandsService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  brands: [],
  brand: {},
  message: "",
};

export const getBrands = createAsyncThunk(
  "Brand/Get-Brands",
  async (thunkAPI) => {
    try {
      const response = await BrandsService.getBrands();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrandById = createAsyncThunk(
  "Brand/Get-Brand-by-id",
  async (brandId, thunkAPI) => {
    try {
      const response = await BrandsService.getBrandById(brandId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  "Brand/Create-Brand",
  async (data, thunkAPI) => {
    try {
      const response = await BrandsService.createBrand(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "Brand/Update-Brand",
  async (data, thunkAPI) => {
    try {
      const response = await BrandsService.updateBrand(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "Brand/Delete-Brand",
  async (brandId, thunkAPI) => {
    try {
      const response = await BrandsService.deleteBrand(brandId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      })
      .addCase(getBrandById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.brand = action.payload;
        state.message = "success";
      })
      .addCase(getBrandById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cratedBarnd = action.payload;
        state.message = "success";
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatebrand = action.payload;
        state.message = "success";
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.meta.arg
        );
        state.message = "success";
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default brands.reducer;
