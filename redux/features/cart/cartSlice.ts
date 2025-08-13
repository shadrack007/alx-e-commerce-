import { CartState, Product } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productExist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (productExist) {
        console.log("product already exist");
        // show toast
        Toast.show({
          type: "info",
          text1: "Product already in cart",
          position: "top",
        });
      } else {
        state.items.push(action.payload);
        Toast.show({
          type: "success",
          text1: "Added to cart",
          position: "top",
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
