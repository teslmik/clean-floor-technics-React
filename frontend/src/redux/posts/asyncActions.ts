import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../../cms/lib/sanitiClient";
import { getAllPosts, getNewPosts } from "./query";
import { IPostItem } from "./types";

export const fetchPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchPostsStatus",
  async () => await client.fetch<IPostItem[]>(getAllPosts),
);

export const fetchNewPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchNewPostsStatus",
  async () => await client.fetch<IPostItem[]>(getNewPosts),
);
