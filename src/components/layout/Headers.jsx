import React from "react";
import "./style.scss";
import IgoLogo from "../../asset/igoLogo.png";
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
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        localStorage.removeItem("refresh");
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
          src={IgoLogo}
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
          <p>{NICKNAME}님</p>
          <button className="Signbtn" onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default Headers;
