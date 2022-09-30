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
      // console.log(data);
      const ACCESS_TOKEN = data.headers.authorization;
      const REFRESH_TOKEN = data.headers.refreshtoken;
      const NICKNAME = data.data.data;
      localStorage.setItem("token", ACCESS_TOKEN); //로컬스토리지에 토큰저장
      localStorage.setItem("refresh", REFRESH_TOKEN); //로컬스토리지에 토큰저장
      localStorage.setItem("nickname", NICKNAME); //로컬스토리지에 닉넴 저장
      Swal.fire({
        icon: "success",
        title: NICKNAME + "님",
        text: "환영합니다!",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/recommend");
        }
      });
    } catch (error) {
      return (
        <>
          <img
            src={loading}
            alt="로딩이미지"
            style={{ width: "50%", margin: "60% 25% 0 25%", display: "block" }}
          />
        </>
      );
    }
  };
};
export default KaKaoLoading;
