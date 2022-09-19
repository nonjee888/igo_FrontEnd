import "./App.css";
import Router from "./shared/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { loginCheck } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      // Storage에 token 저장된 값이 있다면 isLogin 상태를 true로 바꿔주는 함수로 보냄
      dispatch(loginCheck()); //app.js에서 실행될때마다 항상 로컬스토리지에 토큰이 있나 없나보고 state의 isLogin상태를 바꿔줌
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>🚌🚕💸 내돈내여 💸🚗🚆</title>
      </Helmet>
      <div className="mobile-wrapper">
        <Router />
      </div>
    </>
  );
}

export default App;
