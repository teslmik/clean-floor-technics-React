import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { UserType } from "./types";

export const fetchUser = createAsyncThunk<
  UserType | null,
  string | null,
  { state: RootState }
>("user/fetchToken", async (token) => {
  const { data } = await axios.get<UserType | null>(
    `${process.env.REACT_APP_FETCH_URL}/me`,
    { headers: { Authorization: token } }
  );
  return data;
});
