import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.cartItems);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find(
        (item) => item.item_id === action.payload.item_id
      );

      if (!itemExists) {
        state.cartItems.push({ ...action.payload, addedAt: Date.now() });
        toast.success(`${action.payload.name} đã được thêm vào giỏ hàng!`);
      } else {
        toast.warning(`${action.payload.name} đã đã được thêm vào giỏ hàng!`);
      }

      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.item_id !== action.payload.item_id
      );
      toast.info(`Sản phẩm đã đã được xoá khỏi giỏ hàng!`);

      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      if (state.cartItems.length === 0) {
        toast.warning(`Giỏ hàng hiện đang trống!`);
      } else {
        state.cartItems = [];
        toast.info(`Giỏ hàng đã được xoá!`);

        saveCartToLocalStorage(state);
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, selectedQuantity } = action.payload;
      const item = state.cartItems.find((item) => item.item_id === itemId);
      if (item) {
        item.selectedQuantity = selectedQuantity;
      }

      saveCartToLocalStorage(state);
    },
    // Clear cart payment and keep the items not paid in the cart
    clearCartPayment: (state) => {
      if (state.cartItems.length === 0) {
        toast.warning(`Giỏ hàng hiện đang trống!`);
      } else {
        state.cartItems = [];
        toast.info(`Giỏ hàng đã được xoá!`);
      }
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  clearCartPayment,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
