import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logout from "../../asset/logout.png";
import igoLogo from "../../asset/igoLogo.png";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useEffect } from "react";

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
      confirmButtonColor: "#80bbd0",
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
          className="LogoAdmin"
          onClick={() => {
            navigate("/post/all"); // 나중에 /recommend로 바꾸기
          }}
          src={igoLogo}
          alt="로고"
        />
      </div>
      {NICKNAME === null ? (
        <div className="Admin-SignBox">
          <button
            className="Admin-Signbtn"
            onClick={() => {
              navigate("/");
            }}
          >
            소셜로그인하기
          </button>
        </div>
      ) : (
        <div className="Admin-SignBox">
          {myinfo === undefined ? (
            <div className="hearders-nickWrap">
              <p
                className="headers-nick"
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  color: "#555555",
                }}
              >
                {NICKNAME}
              </p>
              님
              <button
                className="Signbtn"
                style={{
                  width: "35%",
                }}
                onClick={logoutHandler}
              >
                <img
                  src={logout}
                  alt="로그아웃"
                  style={{
                    width: "100%",
                  }}
                />
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
              <button
                className="Signbtn"
                style={{
                  width: "35%",
                }}
                onClick={logoutHandler}
              >
                <img
                  src={logout}
                  alt="로그아웃"
                  style={{
                    width: "100%",
                  }}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Headers;
