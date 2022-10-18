import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";

export const putMyinfo = createAsyncThunk(
  "myinfo/put",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(`/api/mypage/profile`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
        },
      });
      if (data.data.success === false)
        Swal.fire({
          icon: "error",
          text: "이미 사용중인 닉네임입니다.",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      else
        Swal.fire({
          icon: "success",
          text: "프로필이 변경되었습니다.",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyinfo = createAsyncThunk("mypage/get", async (_, thunkAPI) => {
  try {
    const data = await instance.get("/api/mypage", {
      headers: {
        REFRESH_TOKEN: localStorage.getItem("REFRESH_TOKEN"),
      },
      data: {},
    });
    // console.log(data);
    return data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const myinfo = createSlice({
  name: "myinfo",
  initialState: {},
  reducers: {},

  extraReducers: {
    //내 프로필 가져오기
    [getMyinfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyinfo.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.myinfo = action.payload;
    },
    [getMyinfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default myinfo.reducer;
