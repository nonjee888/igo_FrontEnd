import React from "react";
import Swal from "sweetalert2";
import loading from "../asset/loading.gif";
import { instance } from "../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../shared/cookie";
import { EventSourcePolyfill } from "event-source-polyfill";
import loginmodalCat from "../asset/loginmodalCat.png";

const NaverLoading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search); //주소뒤의 ? 가 파라미터를 전달해준다는 뜻 //?code=..이면 주소창이 전달해주는 파라미터의 이름은 code 이다.
  let code = params.get("code");

  useEffect(() => {
    dispatch(naver); //주소창에서 뗀 code를 토큰 가져오는 함수에 보내줌
  }, []);

  const naver = async () => {
    try {
      const data = await instance.get(
        `/naver/callback?code=${code}&state=STATE_STRING`
      );
      // console.log(data);
      setCookie("Authorization", data.headers.authorization);
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname); //로컬스토리지에 닉넴 저장
      localStorage.setItem("isLogin", data.headers.authorization);
      const nickname = data.data.data.nickname;

      if (data.data.data.interested.length === 1) {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: nickname + "님",
            text: "관심 태그를 3가지 골라주세요 :)",
            confirmButtonColor: "#47AFDB",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/choice");
            }
          });
        }, 1000);
      } else {
        setTimeout(() => {
          Swal.fire({
            imageUrl: loginmodalCat,
            imageWidth: 400,
            imageHeight: 170,
            title: nickname + "님",
            text: "환영합니다!",
            confirmButtonColor: "#47AFDB",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/recommend");
            }
          });
        }, 1000);
      }
      return data;
    } catch (error) {
      Swal.fire({
        icon: "success",
        text: "오류가 있어요! 관리자에게 문의해주세요😿",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/recommend");
        }
      });
    }
  };
  return (
    <>
      <img
        src={loading}
        alt="로딩이미지"
        style={{ width: "50%", margin: "60% 25% 0 25%", display: "block" }}
      />
    </>
  );
};
export default NaverLoading;
