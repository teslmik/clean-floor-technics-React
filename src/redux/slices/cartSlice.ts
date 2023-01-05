import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLC } from '../../utils/getCartFromLC';
import { RootState } from '../store';

export interface ICartItem {
  id: string;
  category: string;
  imageUrl: string;
  title: string;
  oldPrice: string;
  price: number;
  count: number;
}

interface ICartSliseState {
  totalPrice: number;
  items: ICartItem[];
}

const { items, totalPrice } = getCartFromLC();

const initialState: ICartSliseState = {
  items,
  totalPrice
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    increment(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem && findItem.count++;
      state.totalPrice = calcTotalPrice(state.items);
    },
    decrement(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem && findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  },
})

export const cartSelector = (state: RootState) => state.cart;

export const { addToCart, increment, decrement, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;