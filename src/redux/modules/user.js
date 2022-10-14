import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import loading from "../../asset/loading.gif";
import { instance } from "../../shared/api";

//일반 로그인
export const memberLogin = createAsyncThunk(
  "user/userLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/api/member/login", payload);
      console.log(data);
      const nickname = data.data.data.nickname;
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname);
      localStorage.setItem("isLogin", data.data.data.nickname);
      Swal.fire({
        icon: "success",
        title: `${nickname}` + "님",
        text: "환영합니다!",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          // window.location.replace("/choice");
        }
      });
    } catch (error) {
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

//리듀서 -----------------------------------------------------------------------------------------------------

export const user = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    error: null,
  },
  reducers: {},
});

export default user.reducer;
