import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IPostItem } from "./types";

export const fetchPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchPostsStatus",
  async () => {
    const { data } = await axios.get<IPostItem[]>(
      `${import.meta.env.VITE_APP_FETCH_URL}/posts`
    );
    return data;
  }
);
