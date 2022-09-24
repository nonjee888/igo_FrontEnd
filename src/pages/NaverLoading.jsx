import React from "react";
import { instance } from "../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const NaverLoading = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search); //주소뒤의 ? 가 파라미터를 전달해준다는 뜻 //?code=..이면 주소창이 전달해주는 파라미터의 이름은 code 이다.
  let code = params.get("code");
  // console.log(code); //주소창에서 localhost3000/naverloading/?code= ....  에서 code= "~~~" 가져오기

  useEffect(() => {
    dispatch(naver); //주소창에서 뗀 code를 토큰 가져오는 함수에 보내줌
  }, []);
  const naver = async () => {
    try {
      const data = await instance.get(
        `/naver/callback?code=${code}&state=STATE_STRING`
      );

      const ACCESS_TOKEN = data.headers.authorization;
      const REFRESH_TOKEN = data.headers.refreshtoken;
      console.log(data.data.data);
      const NICKNAME = data.data.data;
      localStorage.setItem("token", ACCESS_TOKEN); //로컬스토리지에 토큰저장
      localStorage.setItem("refresh", REFRESH_TOKEN); //로컬스토리지에 토큰저장
      // localStorage.setItem("nickname", NICKNAME); //로컬스토리지에 닉넴 저장
      // window.location.assign("/post"); //토큰 저장하면 자동으로 메인화면으로 이동
      window.alert("환영합니다!");
      return data;
    } catch (error) {
      console.log("error", error);
      window.alert(error.message);
    }
    return (
      <div>
        <img src="https://cdn.jjalbot.com/2021/12/tPaZBIZ-K/tPaZBIZ-K.gif" />
      </div> // 스피너 gif
    );
  };
};

export default NaverLoading;
