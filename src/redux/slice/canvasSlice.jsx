import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    selectedItem: null, // This will store the selected item
  },
  reducers: {
    selectItem(state, action) {
      state.selectedItem = action.payload; // Set the selected item
    },
    clearItem(state) {
      state.selectedItem = null; // Clear the selection
    },
  },
});

export const { selectItem, clearItem } = canvasSlice.actions;
export default canvasSlice.reducer;
