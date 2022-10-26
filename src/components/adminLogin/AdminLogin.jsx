import React, { lazy, Suspense } from "react";
import "./style.scss";
import { useState } from "react";
import { instance } from "../../shared/api";
import { setCookie } from "../../shared/cookie";
// import AdminSignup from "./AdminSignup";
import tutorial9 from "../../asset/assetTutorial/tutorial9.png";
import igoLogo from "../../asset/igoLogo.png";
import Swal from "sweetalert2";

const AdminSignup = lazy(() => import("./AdminSignup"));

const Admin = () => {
  const initialState = {
    memberId: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const [modal, setModal] = useState(false);
  const close = () => {
    setModal(false);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginHandler = async () => {
    if (user.memberId.trim() === "" || user.password.trim() === "")
      return Swal.fire({
        icon: "info",
        text: "ID, 비밀번호 모두 입력해주세요",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
    const data = await instance.post("/api/member/login", user);

    if (data.data.success === true) {
      const nickname = data.data.data.nickname;
      setCookie("Authorization", data.headers.authorization);
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname);
      localStorage.setItem("isLogin", data.data.data.nickname);

      Swal.fire({
        icon: "success",
        title: `${nickname}` + "님",
        text: "환영합니다!",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/recommend");
        }
      });
    }
    if (data.data.success === false) {
      Swal.fire({
        icon: "error",
        text: "오류가 있어요! 관리자에게 문의해주세요😿",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
    }
  };
  const Loading = () => (
    <div className="All">
      <img
        src={igoLogo}
        style={{
          width: "50%",
          margin: "60% 25% 0 25%",
          display: "block",
        }}
        alt="로고"
      />
    </div>
  );
  return (
    <>
      <Suspense fallback={Loading}>
        {modal ? <AdminSignup close={close} setModal={setModal} /> : null}
      </Suspense>
      <img className="Admin-logo" src={tutorial9} loading="lazy" alt="" />
      <div className="Login-wrap">
        <div className="Login-id">
          <input
            className="Login-input"
            type="text"
            name="memberId"
            value={user.memberId}
            onChange={onChangeHandler}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div>
          <input
            className="Login-input"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="Login-btns">
          <button className="Login-btn" onClick={loginHandler}>
            로그인
          </button>
          <button
            className="Login-btn"
            onClick={() => {
              setModal(true);
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
