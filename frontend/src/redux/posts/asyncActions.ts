import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IPostItem } from "./types";

export const fetchPosts = createAsyncThunk<IPostItem[]>('post/fetchPostsStatus', async () => {
  const { data } = await axios
    .get<IPostItem[]>(`${process.env.REACT_APP_FETCH_URL}/posts`);
  return data;
});