import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

export const getMylikes = createAsyncThunk(
  "mylikes/get",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("api/mypage/likepost", {
        headers: {
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      // console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mylikes = createSlice({
  name: "mylikes",
  initialState: {},
  reducers: {},

  extraReducers: {
    //전체내일정 가져오기
    [getMylikes.pending]: (state) => {
      state.isLoading = true;
    },
    [getMylikes.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.mylike = action.payload;
    },
    [getMylikes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default mylikes.reducer;
