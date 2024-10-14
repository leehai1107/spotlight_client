// store.js
import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slice/menuSlice";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    cart: cartSlice,
  },
});
