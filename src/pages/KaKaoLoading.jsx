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
      Swal.fire({
        icon: "success",
        title: nickname + "님",
        text: "환영합니다!",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/recommend");
        }
      });
      return data;
    } catch (error) {
      console.log("error", error);
      window.alert(error.message); //navigate로 바꾸면 isLogin.state가 false. 새로고침해야 true
    }
    return (
      <div>
        <img src={loading} alt="스피너" />
      </div>
    );
  };
};

export default KaKaoLoading;
