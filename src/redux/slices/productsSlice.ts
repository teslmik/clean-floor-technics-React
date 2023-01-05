import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

interface ISpecification {
  name: string;
  value: string;
};

export interface IProductItem {
  id: string;
  description: string[];
  specification: ISpecification[];
  title: string;
  article: string;
  imageUrl: string;
  imageArr: string[];
  label: {
    _promo: boolean;
    _popular: boolean;
    _new: boolean;
  };
  oldPrice: string;
  price: number;
  availability: boolean;
  category: string;
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IProductSliceState {
  items: IProductItem[];
  status: Status; 
}

export const fetchProducts = createAsyncThunk<IProductItem[], void, {state: RootState}>('product/fetchProductsStatus', async (_, thunkApi) => {
  const { filter } = thunkApi.getState();
  const order = filter.sortState.sortProperty === 'rating' ? 'desc' : 'asc';
  const { data } = await axios
    .get<IProductItem[]>(`https://636e34f8b567eed48ad655d0.mockapi.io/products?sortBy=${filter.sortState.sortProperty}&order=${order}`);
  return data;
});

const initialState: IProductSliceState = {
  items: [],
  status: Status.LOADING
}

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const productsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;