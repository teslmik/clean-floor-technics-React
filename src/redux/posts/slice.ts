import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../products/types';
import { fetchPosts } from './asyncActions';
import { IPostSliceState } from './types';

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

export default postsSlice.reducer;