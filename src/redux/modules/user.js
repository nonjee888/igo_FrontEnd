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

//네이버
export const naver = createAsyncThunk("user/naver", async (code, thunkAPI) => {
  //주소창의 code 뽑아낸걸 payload로 받음
  try {
    const data = await instance.get(
      `/naver/callback?code=${code}&state=STATE_STRING`
    );
    console.log(data);
    const ACCESS_TOKEN = data.headers.authorization;
    const REFRESH_TOKEN = data.headers.refreshtoken;
    const NICKNAME = data.data.data;
    localStorage.setItem("token", ACCESS_TOKEN); //로컬스토리지에 토큰저장
    localStorage.setItem("refresh", REFRESH_TOKEN); //로컬스토리지에 토큰저장
    localStorage.setItem("nickname", NICKNAME); //로컬스토리지에 닉넴 저장
    window.location.assign("/post"); //토큰 저장하면 자동으로 메인화면으로 이동
    window.alert("환영합니다!");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


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
