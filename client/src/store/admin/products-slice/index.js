import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
  error: null,
};

export const addNewProduct = createAsyncThunk(
  "products/addNew",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);
export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, formData }) => {
    const res = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const res = await axios.delete(
    `http://localhost:3000/api/admin/products/delete/${id}`
  );
  return res.data;
});
export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  const res = await axios.get("http://localhost:3000/api/admin/products");
  return res.data;
});

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      });
  },
});

export default AdminProductSlice.reducer;
