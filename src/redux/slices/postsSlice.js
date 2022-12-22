import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('post/fetchPostsStatus', async () => {
  const { data } = await axios
    .get(`https://636e34f8b567eed48ad655d0.mockapi.io/posts`);
  return data;
});

const initialState = {
  items: [],
  status: 'loading' //loading | success | error 
}

export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  }
});

export const postsSelector = (state) => state.posts;

export default postsSlice.reducer;