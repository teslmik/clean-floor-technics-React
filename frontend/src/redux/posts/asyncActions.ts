import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../../cms/lib/sanitiClient";
import { getAllPosts, getNewPosts } from "./query";
import { IPostItem } from "./types";
import { modifyVideoLink } from "../../utils";

export const fetchPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchPostsStatus",
  async () => {
    const data = await client.fetch<IPostItem[]>(getAllPosts);
    return data.map((post) => ({
      ...post,
      videoLink: modifyVideoLink(post.videoLink),
    }));
  },
);

export const fetchNewPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchNewPostsStatus",
  async () => {
    const data = await client.fetch<IPostItem[]>(getNewPosts);
    return data.map((post) => ({
      ...post,
      videoLink: modifyVideoLink(post.videoLink),
    }));
  },
);
