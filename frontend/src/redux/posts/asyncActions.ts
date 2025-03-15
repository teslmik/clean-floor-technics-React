import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../../cms/sanitiClient";
import { getAllPosts, getNewPosts } from "./query";
import { IPostItem } from "./types";

export const fetchPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchPostsStatus",
  async () => {
    const data = await client.fetch<IPostItem[]>(getAllPosts);
    const modifiedData = data.map((post) => {
      if (post.videoLink) {
        post.videoLink = post.videoLink.replace(
          "youtu.be",
          "www.youtube.com/embed",
        );
      }
      return post;
    });

    return modifiedData;
  },
);

export const fetchNewPosts = createAsyncThunk<IPostItem[]>(
  "post/fetchNewPostsStatus",
  async () => {
    const data = await client.fetch<IPostItem[]>(getNewPosts);
    const modifiedData = data.map((post) => {
      if (post.videoLink) {
        post.videoLink = post.videoLink.replace(
          "youtu.be",
          "www.youtube.com/embed",
        );
      }
      return post;
    });

    return modifiedData;
  },
);
