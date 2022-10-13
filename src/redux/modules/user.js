import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import loading from "../../asset/loading.gif";
import { instance } from "../../shared/api";

//일반 로그인
export const memberLogin = createAsyncThunk(
  "user/userLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/api/memeber/login", payload);
      localStorage.setItem("ACCESS_TOKEN");
      localStorage.setItem("REFRESH_TOKEN");
      localStorage.setItem("nickname");
      localStorage.setItem("isLogin");
      const nickname = data.data.data.nickname;

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: nickname + "님",
          text: "환영합니다!",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href("/post/all"); //나중에 /recommend 로 바꾸기
          }
        });
      }, 1000);
      return (
        <div>
          <img
            src={loading}
            style={{ width: "50%", margin: "60% 25% 0 25%", display: "block" }}
            alt="스피너"
          />
        </div>
      );
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
