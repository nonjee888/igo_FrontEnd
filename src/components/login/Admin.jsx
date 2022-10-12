import { useState } from "react";
import { useDispatch } from "react-redux";
const Admin = () => {
  const dispatch = useDispatch();
  const initialState = {
    nickname: "",
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
      <div>
        <input />
      </div>
      <div>
        <input />
      </div>
      <div>
        <button>관리자 로그인</button>
        <button>회원가입</button>
      </div>
    </>
  );
};

export default Admin;
