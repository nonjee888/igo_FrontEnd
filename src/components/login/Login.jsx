import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
// import { NAVER_AUTH_URL } from "../../shared/OAuth";
//랜덤 이미지들 12개
import img1 from "../../asset/assetLogin/img1.png";
import img2 from "../../asset/assetLogin/img2.png";
import img3 from "../../asset/assetLogin/img3.png";
import img5 from "../../asset/assetLogin/img5.png";
import img6 from "../../asset/assetLogin/img6.png";
import img7 from "../../asset/assetLogin/img7.png";
import img8 from "../../asset/assetLogin/img8.png";
import img9 from "../../asset/assetLogin/img9.png";
import img10 from "../../asset/assetLogin/img10.png";
import img11 from "../../asset/assetLogin/img11.png";
import img12 from "../../asset/assetLogin/img12.png";
import logo from "../../asset/assetLogin/logo.png";
import naver from "../../asset/assetLogin/naver.png";
import kakao from "../../asset/assetLogin/kakao.png";

const backgroundArr = [
  img1,
  img2,
  img3,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];
const randomIndex = Math.floor(Math.random() * backgroundArr.length);
const backgroundImg = backgroundArr[randomIndex];

const Login = () => {
  let navigate = useNavigate();
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT}&state=STATE_STRING`;
  return (
    <>
      <section
        className="mobile-wrapper"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
        }}
      >
        <div className="loginCss">
          <img
            src={logo}
            alt="내돈내여로고"
            style={{
              width: "180px",
              height: "90px",
              marginLeft: "2%",
              paddingBottom: "40px",
              marginTop: "27vh",
            }}
          />

          <a href={NAVER_AUTH_URL}>
            <img src={naver} alt="네이버로시작하기" loading="lazy" />
          </a>

          <a href={KAKAO_AUTH_URL}>
            <img src={kakao} alt="카카오로시작하기" loading="lazy" />
          </a>

          <button
            className="loginButton"
            onClick={() => {
              navigate("/post/all");
            }}
          >
            비회원으로 둘러보기
          </button>
        </div>
      </section>
    </>
  );
};

export default Login;
