import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import products from './slices/productsSlice';
import posts from './slices/postsSlice';

export const store = configureStore({
  reducer: { filter, cart, products, posts },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();