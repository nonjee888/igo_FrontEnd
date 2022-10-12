import { useState } from "react";
import igoLogo from "../../asset/igoLogo.png";

const AdminSignup = () => {
  const initialState = {
    id: "",
    password: "",
    passwordConfirm: "",
  };
  const [user, setUser] = useState(initialState);
  const onChangeHandler = () => {};
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="AdminModal-Back">
        <div className="AdminModal-container">
          <img className="Admin-logo" src={igoLogo} />
          <form className="Signup-form" onSubmit={onSubmitHandler}>
            <div className="Signup-inputs">
              <div className="input-id">
                <input
                  className="Admin-input"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <button className="id-check">ID중복확인</button>
              <div>
                <input
                  className="Admin-input"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <div>
                <input
                  className="Admin-input"
                  placeholder="비밀번호 중복확인"
                />
              </div>
            </div>
            <div className="SignUp-btns">
              <button className="Admin-btn">회원가입</button>
              <button className="Admin-btn">뒤로가기</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
