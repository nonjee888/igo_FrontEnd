import React from "react";
import "../../style.scss";
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
            style={{
              width: "170px",
              height: "170px",
              marginLeft: "4%",
              paddingBottom: "50px",
            }}
          />
          <img src={naver} />
          <img src={kakao} />
          <button className="loginButton">비회원으로 둘러보기</button>
        </div>
      </section>
    </>
  );
};

export default Login;
