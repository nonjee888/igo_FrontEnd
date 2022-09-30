import "./App.css";
import "./style.scss";
import Router from "./shared/Router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../src/redux/modules/user";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Storage에 token 저장된 값이 있다면 isLogin 상태를 true로 바꿔주는 함수로 보냄
      dispatch(loginCheck()); //app.js에서 실행될때마다 항상 로컬스토리지에 토큰이 있나 없나보고 state의 isLogin상태를 바꿔줌
    }
  }, [dispatch]);
  const userlogin = useSelector((state) => state.user);
  const checklogin = userlogin.isLogin;

  console.log(checklogin); //로그인 상태 체크
  return (
    <>
      <div className="mobile-wrapper">
        <Router isLogin={checklogin} />
      </div>
    </>
  );
}

export default App;
