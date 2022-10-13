import { useState } from "react";
import { useDispatch } from "react-redux";
import { memberLogin } from "../../redux/modules/user";
import AdminSignup from "./AdminSignup";
import igoLogo from "../../asset/igoLogo.png";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    id: "",
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
  const loginHandler = () => {
    if (user.id.trim() === "" || user.password.trim() === "")
      return Swal.fire({
        icon: "info",
        text: "ID, 비밀번호 모두 입력해주세요",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
    dispatch(memberLogin(user));
    navigate("/recommend");
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
            name="id"
            value={user.id}
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
