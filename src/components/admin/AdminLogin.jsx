import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminSignup from "./AdminSignup";
const Admin = () => {
  const dispatch = useDispatch();
  const initialState = {
    id: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [modal, setModal] = useState(false);
  const close = () => {
    setModal(false);
  };
  const onChangeHandler = () => {};

  return (
    <>
      {modal ? <AdminSignup /> : null}
      <div>
        <input className="Admin-input" />
      </div>
      <div>
        <input className="Admin-input" />
      </div>
      <div>
        <button className="Admin-btn">관리자 로그인</button>
        <button
          className="Admin-btn"
          onClick={() => {
            setModal(true);
          }}
        >
          회원가입
        </button>
      </div>
    </>
  );
};

export default Admin;
