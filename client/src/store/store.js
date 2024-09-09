import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminProductsSlice from "./admin/products-slice";
import shopProductsSlice from "./shop/product-slice.js";
import cartSlice from "./cart/cart-slice";
import addressSlice from "./shop/address-slice";
import adminOrderSlice from "./admin/order-slice/index.js";
import shopOrderSlice from "./shop/order-slice.js";
import shopSearchSlice from "./shop/search-slice.js";
import filterSlice from "./shop/filter-slice";
import favouriteSlice from "./favourite/favourite-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductsSlice,
    cart: cartSlice,
    favourite: favouriteSlice,
    address: addressSlice,
    adminOrder: adminOrderSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    filter: filterSlice,
  },
});

export default store;
