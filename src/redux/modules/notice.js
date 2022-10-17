import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

//리듀서 -----------------------------------------------------------------------------------------------------

export const getNotice = createAsyncThunk(
  "notice/getNotice",
  async (_, thunkAPI) => {
    try {
      const data = await instance.get("/api/member/notifications");

      return data;
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

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const notice = createSlice({
  name: "notice",
  initialState: {
    notice: "",
    isLogin: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    //노티스 목록 전체 조회
    [getNotice.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getNotice.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.notice = action.payload;
    },
    [getNotice.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //노티스 목록 전체 조회
    [removeNotice.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [removeNotice.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      let index = state.notice.findIndex(
        (notice) => notice.id === action.payload.data
      );
      state.notice.splice(index, 1);
    },
    [removeNotice.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default notice.reducer;
