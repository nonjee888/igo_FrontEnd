import "./style.scss";
import { useState } from "react";
import tutorial9 from "../../asset/assetTutorial/tutorial9.png";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";
const AdminSignup = ({ setModal }) => {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userIdError, setUserIdError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const onChangeUserId = (e) => {
    const userIdRegex = /^[a-zA-Z0-9]{4,12}$/; //4-12자리 소,대 영문자 + 숫자
    if (!e.target.value || userIdRegex.test(e.target.value))
      setUserIdError(false);
    else setUserIdError(true);
    setUserId(e.target.value);
  };

  const onChangePassword = (e) => {
    const passwordRegex = /^[0-9a-zA-Z]{3,18}$/; //3-18자리 소,대 영문자 + 숫자
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(true);
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    setConfirmPassword(e.target.value);
  };

  const onChangeNickname = (e) => {
    const nicknameRegex = /^[0-9a-zA-Zㄱ-ㅎ가-힣]{2,10}$/; //2-10자리 소,대 영문자 + 한글 + 숫자
    if (!e.target.value || nicknameRegex.test(e.target.value))
      setNicknameError(false);
    else setNicknameError(true);
    setNickname(e.target.value);
  };

  const validation = () => {
    if (!userId) setUserIdError(true);
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!nickname) setNicknameError(true);

    if (userId && password && confirmPassword && nickname) return true;
    else return false;
  };

  const onSignup = async (event) => {
    event.preventDefault();

    const user = {
      memberId: userId,
      password: password,
      passwordConfirm: confirmPassword,
      nickname,
    };

    //유효성 검사가 성공적이면 회원가입 post 요청
    if (validation() === true) {
      const { data } = await instance.post("/api/member/signup", user);

      if (data.success) {
        Swal.fire({
          icon: "info",
          text: `${data.data}`,
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });
        window.location.replace("/login");
      }
      if (data.error.message) {
        const message = data.error.message;
        Swal.fire({
          icon: "info",
          text: `${message}`,
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });
      } else {
        Swal.fire({
          icon: "info",
          text: "오류가 있어요! 관리자에게 문의해주세요😿",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });
      }
    }
  };

  return (
    <>
      <div className="AdminModal-Back">
        <div className="AdminModal-container">
          <img className="Admin-logo" src={tutorial9} loading="lazy" />
          <div className="Signup-form">
            <div className="Signup-inputs">
              <div className="input-id">
                <input
                  className="Admin-input"
                  name="id"
                  type="text"
                  minLength={4}
                  maxLength={20}
                  value={userId}
                  onChange={onChangeUserId}
                  placeholder="아이디를 입력하세요"
                  required
                />
                {userIdError && (
                  <div className="invalid-input">아이디 4~12자 영문 + 숫자</div>
                )}
              </div>
              <div className="input-nick">
                <input
                  className="Admin-input"
                  name="nickname"
                  type="text"
                  minLength={4}
                  maxLength={12}
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="닉네임을 입력하세요"
                  required
                />
                {nicknameError && (
                  <div className="invalid-input">
                    닉네임 2~10자(특수문자 불가)
                  </div>
                )}
              </div>
              <div>
                <input
                  className="Admin-input"
                  type="password"
                  name="password"
                  maxLength={18}
                  value={password}
                  onChange={onChangePassword}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                {passwordError && (
                  <div className="invalid-input">4~18자 영,숫자 조합</div>
                )}
              </div>
              <div>
                <input
                  className="Admin-input"
                  type="password"
                  name="passwordConfirm"
                  maxLength={18}
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  placeholder="비밀번호 중복확인"
                  required
                />
                {confirmPasswordError && (
                  <div className="invalid-input">
                    비밀번호가 일치하지 않습니다
                  </div>
                )}
              </div>
            </div>
            <div className="SignUp-btns">
              <button className="Admin-btn" type="button" onClick={onSignup}>
                가입하기
              </button>
              <button
                className="Admin-btn"
                onClick={() => {
                  setModal(false);
                }}
              >
                뒤로가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
