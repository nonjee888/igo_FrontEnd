import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
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

export const confirmNotice = createAsyncThunk(
  "notice/confirmNotice",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.patch(`/api/member/notifications/${payload}`);

      if (data.status === 204) {
        Swal.fire({
          text: "알림을 확인했습니다",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            return data?.data;
          }
        });
      }
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
    [confirmNotice.pending]: (state) => {
      state.isLoading = true;
    },
    [confirmNotice.fulfilled]: (state, action) => {
      state.isLoading = false;

      let confirm = state?.notice?.map((confirm) => {
        if (confirm.id === action.meta.arg) {
          return {
            ...confirm,
            read: !confirm.read,
          };
        } else {
          return { ...confirm };
        }
      });
      state.notice = confirm;
    },
    [confirmNotice.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default notice.reducer;
