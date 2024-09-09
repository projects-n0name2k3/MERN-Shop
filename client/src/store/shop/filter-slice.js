import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  currentFilter: undefined,
};

const filterSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
