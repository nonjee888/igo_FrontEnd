import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

//미들웨어 ----------------------------------------------------------------------------------------------

//카카오 로그인
export const getKakao = createAsyncThunk(
  "user/getKakao",
  async (code, thunkAPI) => {
    try {
      const data = await instance.get(`/kakao/callback?code=${code}`);
      console.log(data);
      const ACCESS_TOKEN = data.headers.authorization;
      localStorage.setItem("token", ACCESS_TOKEN);
      window.location.assign("/post");
      window.alert("카카오 로그인 성공!");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
  reducers: {
    //로그인상태확인 리듀서
    loginCheck: (state) => {
      //app.js에서 뭔가 실행 될 때마다 항상 로컬스토리지에 토큰이 있나 없나 보고 state의 isLogin상태 바꿔줌
    },
  },
});

export const { loginCheck } = user.actions;
export default user.reducer;
