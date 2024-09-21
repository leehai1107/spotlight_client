// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isNavOpened: false,
    isMenuMinified: false,
  },
  reducers: {
    toggleMenu(state) {
      state.isNavOpened = !state.isNavOpened;
    },
    collapseMenu(state) {
      state.isMenuMinified = !state.isMenuMinified;
    },
  },
});

export const { toggleMenu, collapseMenu } = menuSlice.actions;
export default menuSlice.reducer;
