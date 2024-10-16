import { createSlice } from "@reduxjs/toolkit";

const customizeSlice = createSlice({
  name: "customize",
  initialState: {
    selectedItem: null, // This will store the selected item
  },
  reducers: {
    selectCustomizeItem(state, action) {
      state.selectedItem = null;
      // clear the selection
      state.selectedItem = action.payload; // Set the selected item
    },
    clearCustomizeItem(state) {
      state.selectedItem = null; // Clear the selection
    },
  },
});

export const { selectCustomizeItem, clearCustomizeItem } =
  customizeSlice.actions;
export default customizeSlice.reducer;
