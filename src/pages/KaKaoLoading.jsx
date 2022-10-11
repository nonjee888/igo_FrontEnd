import React from "react";
import { useDispatch } from "react-redux";
import { instance } from "../shared/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import loading from "../asset/loading.gif";
import Swal from "sweetalert2";

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
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname);
      localStorage.setItem("isLogin", data.headers.authorization);
      const nickname = data.data.data.nickname;
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: nickname + "님",
          text: "환영합니다!",
          confirmButtonColor: "#80bbd0",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/post/all"); // 나중에 /recommend로 바꾸기
          }
        });
      }, 1000);
      return data;
    } catch (error) {
      window.alert(error.message); //navigate로 바꾸면 isLogin.state가 false. 새로고침해야 true
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
