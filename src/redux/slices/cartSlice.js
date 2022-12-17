import { createSlice } from '@reduxjs/toolkit';

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLC } from '../../utils/getCartFromLC';

const { items, totalPrice } = getCartFromLC();

const initialState = {
  items,
  totalPrice
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    increment(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem && findItem.count++;
      state.totalPrice = calcTotalPrice(state.items);
    },
    decrement(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem && findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
})

export const cartSelector = (state) => state.cart;

export const { addToCart, increment, decrement, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;