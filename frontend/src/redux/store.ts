import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cart from './cart/slice';
import filter from './filter/slice';
import posts from './posts/slice';
import products from './products/slice';
import rates from './rates/slice';

export const store = configureStore({
  reducer: { filter, cart, products, posts, rates },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();