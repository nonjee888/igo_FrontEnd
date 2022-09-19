import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

//미들웨어 ----------------------------------------------------------------------------------------------

//네이버 로그인     //엑스트라리듀서 안씀
export const getToken = createAsyncThunk(
  "user/getToken",
  async (code, thunkAPI) => {
    //주소창의 code 뽑아낸걸 payload로 받음
    try {
      const data = await instance.get(`auth/naver?code=${code}&state=123`); //서버주소+코드정보 로 get요청을 보내면 response에 토큰을 받을수있다.
      const ACCESS_TOKEN = data.headers.authorization;
      localStorage.setItem("token", ACCESS_TOKEN); //로컬스토리지에 토큰저장
      window.location.assign("/"); //토큰 저장하면 자동으로 메인화면으로 이동
      window.alert("환영합니다!");
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
