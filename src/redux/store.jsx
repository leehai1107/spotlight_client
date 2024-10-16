// store.js
import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slice/menuSlice";
import cartSlice from "./slice/cartSlice";
import canvasSlice from "./slice/canvasSlice";
import buynowSlice from "./slice/buynowSlice";
import customizeSlice from "./slice/customizeSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    cart: cartSlice,
    canvas: canvasSlice,
    buynow: buynowSlice,
    customize: customizeSlice,
  },
});
