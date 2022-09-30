import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getMyplans = createAsyncThunk(
  "myplans/getMyplans",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/mypost");
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const myplans = createSlice({
  name: "myplans",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {},
});

export default myplans.reducer;
