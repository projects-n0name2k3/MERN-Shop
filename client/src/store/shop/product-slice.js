import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  productDetail: null,
};

export const getFilteredProducts = createAsyncThunk(
  "products/getAll",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(`http://localhost:3000/api/shop/?${query}`);
    return result?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id) => {
    const result = await axios.get(`http://localhost:3000/api/shop/${id}`);
    return result?.data;
  }
);

const shopProductsSlice = createSlice({
  name: "shoppingproducts",
  initialState,
  reducers: {
    setProductDetail: (state, action) => {
      state.productDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
    });
    builder.addCase(getFilteredProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetail = action.payload.data;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.isLoading = false;
      state.productDetail = null;
    });
  },
});
export const { setProductDetail } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;
