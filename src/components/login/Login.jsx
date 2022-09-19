import React from "react";
import img1 from "../../asset/assetLogin/img1.jpg";
import img2 from "../../asset/assetLogin/img2.jpg";
import img3 from "../../asset/assetLogin/img3.jpg";
import img4 from "../../asset/assetLogin/img4.jpg";

const backgroundArr = [img1, img2, img3, img4];
const randomIndex = Math.floor(Math.random() * backgroundArr.length);
const backgroundImg = backgroundArr[randomIndex];

const Login = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${backgroundImg})`,
          width: "70%",
          height: "1000px",
        }}
      >
        <p>비회원둘러보기</p>
      </section>
    </>
  );
};

export default Login;
