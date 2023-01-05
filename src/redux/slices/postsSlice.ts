import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { Status } from './productsSlice';

export interface IPostItem {
  date: string;
  id: string;
  imageUrl: string;
  text: string[];
  title: string;
}

interface IPostSliceState {
  items: IPostItem[];
  status: Status; 
}

export const fetchPosts = createAsyncThunk<IPostItem[], Record<string, string>>('post/fetchPostsStatus', async (params) => {
  const { id } = params;
  const { data } = await axios
    .get<IPostItem[]>(`https://636e34f8b567eed48ad655d0.mockapi.io/posts${id ? `/${id}` : ''}`);
  return data;
});

const initialState: IPostSliceState = {
  items: [],
  status: Status.LOADING
}

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
});

export const postsSelector = (state: RootState) => state.posts;

export default postsSlice.reducer;