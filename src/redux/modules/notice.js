import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { instance } from "../../shared/api";

//리듀서 -----------------------------------------------------------------------------------------------------

export const getNotice = createAsyncThunk(
  "notice/getNotice",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/member/notifications");

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeNotice = createAsyncThunk(
  "notice/removeNotice",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(
        `/api/member/notifications/${payload}`
      );

      return data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const notice = createSlice({
  name: "notice",
  initialState: {
    notice: [],
    isLogin: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    //노티스 전체 조회
    [getNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [getNotice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notice = action.payload.notificationResponses;
    },
    [getNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //노티스 삭제
    [removeNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [removeNotice.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.notice.findIndex(
        (notice) => notice.id === action.payload
      );
      state.notice.splice(index, 1);
    },
    [removeNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default notice.reducer;
