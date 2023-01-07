import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IPostItem } from "./types";

export const fetchPosts = createAsyncThunk<IPostItem[]>('post/fetchPostsStatus', async () => {
  const { data } = await axios
    .get<IPostItem[]>(`https://636e34f8b567eed48ad655d0.mockapi.io/posts`);
  return data;
});