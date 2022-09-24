import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

//미들웨어 ----------------------------------------------------------------------------------------------

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
      state.isLogin = true;
    },
  },
});

export const { loginCheck } = user.actions;
export default user.reducer;
