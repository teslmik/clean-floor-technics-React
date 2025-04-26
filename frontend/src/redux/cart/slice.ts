import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLC } from "../../utils/getCartFromLS";
import { ICartItem, ICartSliseState } from "./types";

const { items, totalPrice } = getCartFromLC();

const initialState: ICartSliseState = {
  items,
  totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    increment(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj._id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    decrement(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj._id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj._id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
