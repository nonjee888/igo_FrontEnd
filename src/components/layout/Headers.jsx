import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logout from "../../asset/logout.png";
import igoLogo from "../../asset/igoLogo.png";
import loginRegister from "../../asset/loginRegister.png";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useEffect } from "react";
import { deleteCookie } from "../../shared/cookie";

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myinfo = useSelector((state) => state?.myinfo?.myinfo);

  useEffect(() => {
    dispatch(getMyinfo());
  }, []);

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
        deleteCookie("Authorization");
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
            navigate("/post/all"); // 나중에 /recommend로 바꾸기
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
            <img
              src={loginRegister}
              alt="로그인회원가입"
              className="loginButton"
            />
          </button>
        </div>
      ) : (
        <div className="Sign-box">
          {myinfo === undefined ? (
            <div className="hearders-nickWrap">
              <div className="headers-님">
                <div
                  className="headers-nick"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1em",
                    color: "#555555",
                  }}
                >
                  {NICKNAME}
                </div>
                님
              </div>
              <button className="Signbtn" onClick={logoutHandler}>
                <img src={logout} alt="로그아웃" className="logoutButton" />
              </button>
            </div>
          ) : (
            <div className="hearders-nickWrap">
              <div className="headers-님">
                <div
                  className="headers-nick"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1em",
                    color: "#555555",
                  }}
                >
                  {myinfo[0].nickname}
                </div>
                님
              </div>
              <button className="Signbtn" onClick={logoutHandler}>
                <img src={logout} alt="로그아웃" className="logoutButton" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Headers;
