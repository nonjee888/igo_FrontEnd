import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getTags = createAsyncThunk("tags/get", async (_, thunkAPI) => {
  try {
    const data = await instance.get(`/api/member/posts`);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const tags = createSlice({
  name: "tags",
  initialState: {},
  reducers: {},

  extraReducers: {
    [getTags.pending]: (state) => {
      state.isLoading = true;
    },
    [getTags.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tags = action.payload;
      console.log(action);
    },
    [getTags.rejected]: (state, action) => {
      state.isLoading = false;
      state.tags = action.payLoad;
    },
  },
});

export default tags.reducer;
