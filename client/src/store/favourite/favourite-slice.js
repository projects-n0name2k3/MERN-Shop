import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  favItems: [],
  isLoading: false,
};

export const addToFavourite = createAsyncThunk(
  "favourite/addToFavourite",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/favourite/add",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const fetchFavouriteItems = createAsyncThunk(
  "favourite/fetchFavouriteItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/favourite/get/${userId}`
    );

    return response.data;
  }
);

export const deleteFavouriteItem = createAsyncThunk(
  "favourite/deleteFavouriteItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/favourite/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateFavouriteQuantity = createAsyncThunk(
  "favourite/updateFavouriteQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:3000/api/shop/favourite/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

const shoppingFavouriteSlice = createSlice({
  name: "shoppingFavourite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavourite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favItems = action.payload.data;
      })
      .addCase(addToFavourite.rejected, (state) => {
        state.isLoading = false;
        state.favItems = [];
      })
      .addCase(fetchFavouriteItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavouriteItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favItems = action.payload.data;
      })
      .addCase(fetchFavouriteItems.rejected, (state) => {
        state.isLoading = false;
        state.favItems = [];
      })
      .addCase(updateFavouriteQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavouriteQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favItems = action.payload.data;
      })
      .addCase(updateFavouriteQuantity.rejected, (state) => {
        state.isLoading = false;
        state.favItems = [];
      })
      .addCase(deleteFavouriteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFavouriteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favItems = action.payload.data;
      })
      .addCase(deleteFavouriteItem.rejected, (state) => {
        state.isLoading = false;
        state.favItems = [];
      });
  },
});

export default shoppingFavouriteSlice.reducer;
