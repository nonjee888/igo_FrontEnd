import React from "react";
import "./style.scss";
import IgoLogo from "../../asset/igoLogo.png";
import { Navigate, useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();
  return (
    <div className="Header-wrapper">
      <div className="HeaderForm">
        <img
          className="Logo"
          onClick={() => {
            navigate("/recommend");
          }}
          src={IgoLogo}
        />
      </div>
      <div className="Sign-box">
        <button
          className="Signbtn"
          onClick={() => {
            navigate("/");
          }}
        >
          로그인
        </button>
        <button
          className="Signbtn"
          onClick={() => {
            navigate("");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Headers;
