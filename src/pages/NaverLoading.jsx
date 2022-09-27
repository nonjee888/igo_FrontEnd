import React from "react";
import { instance } from "../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { naver } from "../redux/modules/user";

const NaverLoading = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search); //주소뒤의 ? 가 파라미터를 전달해준다는 뜻 //?code=..이면 주소창이 전달해주는 파라미터의 이름은 code 이다.
  let code = params.get("code");
  // console.log(code); //주소창에서 localhost3000/naverloading/?code= ....  에서 code= "~~~" 가져오기

  useEffect(() => {
    dispatch(naver(code)); //주소창에서 뗀 code를 토큰 가져오는 함수에 보내줌
  }, []);

  return (
    <div>
      <img src="https://cdn.jjalbot.com/2021/12/tPaZBIZ-K/tPaZBIZ-K.gif" />
    </div> // 스피너 gif
  );
};

export default NaverLoading;
