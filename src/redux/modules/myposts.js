import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getMyposts = createAsyncThunk(
  "myposts/get",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/member/post", {
        headers: {
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      // console.log(data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const myposts = createSlice({
  name: "myposts",
  initialState: {},
  reducers: {},

  extraReducers: {
    //전체내일정 가져오기
    [getMyposts.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyposts.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.myposts = action.payload;
    },
    [getMyposts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default myposts.reducer;
