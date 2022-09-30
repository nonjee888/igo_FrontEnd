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

  extraReducers: {
    //내일정 가져오기
    [getMyplans.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default myplans.reducer;
