import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import igoLogo from "../../asset/igoLogo.png";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";
const AdminSignup = ({ setModal }) => {
  const navigate = useNavigate();
  const initialState = {
    id: "",
    password: "",
    passwordConfirm: "",
  };
  const [user, setUser] = useState(initialState);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { data } = await instance.post("/api/member/signup", user);
    if (data.success) {
      navigate("/post/all"); // 나중에 /recommend 로 바꾸기
    } else {
      Swal.fire({
        icon: "info",
        text: "회원가입에 실패했습니다. 관리자에게 문의하세요.",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
      navigate("/login");
    }
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
                  name="id"
                  type="text"
                  value={user.id}
                  onChange={onChangeHandler}
                  placeholder="아이디를 입력하세요"
                  required
                />
              </div>
              <button className="id-check">ID중복확인</button>
              <div>
                <input
                  className="Admin-input"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={onChangeHandler}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
              <div>
                <input
                  className="Admin-input"
                  type="password"
                  name="passwordConfirm"
                  value={user.passwordConfirm}
                  onChange={onChangeHandler}
                  placeholder="비밀번호 중복확인"
                  required
                />
              </div>
            </div>
            <div className="SignUp-btns">
              <button className="Admin-btn">가입하기</button>
              <button
                className="Admin-btn"
                onClick={() => {
                  setModal(false);
                }}
              >
                뒤로가기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
