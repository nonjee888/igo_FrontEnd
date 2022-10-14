import { useState } from "react";
import { useDispatch } from "react-redux";
import { instance } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import AdminSignup from "./AdminSignup";
import igoLogo from "../../asset/igoLogo.png";
import Swal from "sweetalert2";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    console.log(data);
    if (data.data.success === true) {
      const nickname = data.data.data.nickname;
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
          window.location.replace("/choice");
        }
      });
    }
    if (data.data.success === false) {
      Swal.fire({
        icon: "success",
        text: `${data.data.error.message}`,
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <>
      {modal ? <AdminSignup close={close} setModal={setModal} /> : null}
      <img className="Admin-logo" src={igoLogo} />
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
