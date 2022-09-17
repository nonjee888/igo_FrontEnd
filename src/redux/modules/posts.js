import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default posts.reducer;
