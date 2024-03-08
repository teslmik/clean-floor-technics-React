import { createSlice } from "@reduxjs/toolkit";

import { fetchUser } from "./asyncActions";
import { IUserSliceState, Status } from "./types";

const initialState: IUserSliceState = {
  user: null,
  status: Status.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
      state.user = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.user = null;
      localStorage.clear();
    });
  },
});

export default userSlice.reducer;
