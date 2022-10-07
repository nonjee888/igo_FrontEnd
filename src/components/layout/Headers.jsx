import React from "react";
import "./style.scss";
import igoLogo from "../../asset/igoLogo.png";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Headers = () => {
  const navigate = useNavigate();
  const NICKNAME = localStorage.getItem("nickname");
  //로그아웃
  const logoutHandler = () => {
    Swal.fire({
      icon: "question",
      title: "로그아웃",
      text: "정말로 로그아웃하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#47AFDB",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("nickname");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("TOAST UI editor for localhost: Statistics");
        localStorage.removeItem(
          "TOAST UI color-picker for localhost: Statistics"
        );
        navigate("/");
        window.location.reload();
      }
    });
  };
  return (
    <div className="Header-wrapper">
      <div className="HeaderForm">
        <img
          className="Logo"
          onClick={() => {
            navigate("/recommend");
          }}
          src={igoLogo}
          alt="로고"
        />
      </div>
      {NICKNAME === null ? (
        <div className="Sign-box">
          <button
            className="Signbtn"
            onClick={() => {
              navigate("/");
            }}
          >
            로그인/회원가입
          </button>
        </div>
      ) : (
        <div className="Sign-box">
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#555555" }}>
            {NICKNAME}님
          </p>
          <button
            className="Signbtn"
            onClick={logoutHandler}
            style={{
              width: "45%",
              height: "45%",
              marginLeft: "1rem",
              borderRadius: "22px",
              textAlign: "center",
              background: "linear-gradient( to left, #F5C9E0 30% ,#47AFDB 70%)",
              fontSize: "1rem",
              color: "white",
              fontWeight: "bold",
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default Headers;
