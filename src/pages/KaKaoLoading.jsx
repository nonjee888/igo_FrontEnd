import React from "react";
import { useDispatch } from "react-redux";
import { instance } from "../shared/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import loading from "../asset/loading.gif";
import Swal from "sweetalert2";
import { setCookie } from "../shared/cookie";
import loginmodalCat from "../asset/loginmodalCat.png";

const KaKaoLoading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");
  // console.log(code);

  useEffect(() => {
    dispatch(kakao);
  }, []);

  const kakao = async () => {
    try {
      const data = await instance.get(`/kakao/callback?code=${code}`);
      setCookie("Authorization", data.headers.authorization);
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname);
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
            imageUrl:loginmodalCat,
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
        text: error.message,
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
    <div>
      <img
        src={loading}
        style={{ width: "50%", margin: "60% 25% 0 25%", display: "block" }}
        alt="스피너"
      />
    </div>
  );
};

export default KaKaoLoading;
