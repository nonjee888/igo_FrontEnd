import React from "react";
import { useDispatch } from "react-redux";
import { getKakao } from "../redux/modules/user";
import { useEffect } from "react";

const KaKaoLoading = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");
  console.log(code);

  useEffect(() => {
    dispatch(getKakao(code));
  }, []);

  return (
    <>
      <img
        src="https://cdn.jjalbot.com/2021/12/tPaZBIZ-K/tPaZBIZ-K.gif"
        alt="로딩이미지"
      />
    </>
  );
};
export default KaKaoLoading;
