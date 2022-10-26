import React from "react";
import "./style.scss";
import tutorial0 from "../../asset/assetTutorial/tutorial0.png";
import tutorial2 from "../../asset/assetTutorial/tutorial2.png";
import tutorial3 from "../../asset/assetTutorial/tutorial3.png";
import tutorial4 from "../../asset/assetTutorial/tutorial4.png";
import tutorial5 from "../../asset/assetTutorial/tutorial5.png";
import tutorial6 from "../../asset/assetTutorial/tutorial6.png";
import tutorial7 from "../../asset/assetTutorial/tutorial7.png";
import tutorial8 from "../../asset/assetTutorial/tutorial8.png";
import tutorial9 from "../../asset/assetTutorial/tutorial9.png";
import goback from "../../asset/goback.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Tutorial() {
  const NICKNAME = localStorage.getItem("nickname");
  const navigate = useNavigate();

  return (
    <div className="tutorialbody">
      <img
        src={goback}
        alt="뒤로"
        onClick={() => {
          navigate(-1);
        }}
        style={{ width: "8%", height: "5%", margin: "5%", cursor: "pointer" }}
      />
      {NICKNAME ? (
        <div className="tutorialimg-wrapper">
          <img className="tutorialboxs" src={tutorial0} loading="lazy" />
          <img className="tutorialboxs" src={tutorial2} loading="lazy" />
          <img
            className="tutorialboxs"
            style={{ cursor: "pointer" }}
            src={tutorial8}
            loading="lazy"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSdCcFuEap6TCvgPGDc1Kz9uOsl68-026qGyjHAZVD90UGY2Rw/viewform?usp=sf_link",
                "_blank"
              )
            }
          />
          <img className="tutorialboxs" src={tutorial3} loading="lazy" />
          <img className="tutorialboxs" src={tutorial4} loading="lazy" />
          <img className="tutorialboxs" src={tutorial5} loading="lazy" />
          <img className="tutorialboxs" src={tutorial6} loading="lazy" />
          <img className="tutorialboxs" src={tutorial7} loading="lazy" />
          <img className="tutorialboxs" src={tutorial9} loading="lazy" />
        </div>
      ) : (
        Swal.fire({
          icon: "error",
          text: "로그인을 하셔야 이용 가능합니다.",
          showCancelButton: true,
          confirmButtonColor: "#47AFDB",
          cancelButtonColor: "#D9D9D9",
          confirmButtonText: "로그인하러가기",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/");
          }
        })
      )}
    </div>
  );
}
