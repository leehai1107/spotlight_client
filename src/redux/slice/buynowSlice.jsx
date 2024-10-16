import { createSlice } from "@reduxjs/toolkit";

const buynowSlice = createSlice({
  name: "buynow",
  initialState: {
    selectedItem: null, // This will store the selected item
  },
  reducers: {
    selectBuyNowItem(state, action) {
      state.selectedItem = action.payload; // Set the selected item
    },
    clearBuyNowItem(state) {
      state.selectedItem = null; // Clear the selection
    },
  },
});

export const { selectBuyNowItem, clearBuyNowItem } = buynowSlice.actions;
export default buynowSlice.reducer;
