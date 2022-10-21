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
import Swal from "sweetalert2";

export default function Tutorial() {
  const NICKNAME = localStorage.getItem("nickname");

  return (
    <div>
      {NICKNAME ? (
        <div className="tutorialimg-wrapper">
          <img className="tutorialbox" src={tutorial0} />
          <img className="tutorialboxs" src={tutorial2} />
          <img
            className="tutorialboxs"
            src={tutorial8}
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSdCcFuEap6TCvgPGDc1Kz9uOsl68-026qGyjHAZVD90UGY2Rw/viewform?usp=sf_link",
                "_blank"
              )
            }
          />
          <img className="tutorialboxs" src={tutorial3} />
          <img className="tutorialboxs" src={tutorial4} />
          <img className="tutorialboxs" src={tutorial5} />
          <img className="tutorialboxs" src={tutorial6} />
          <img className="tutorialboxs" src={tutorial7} />


    return (

        <div className="tutorialbody">
          {NICKNAME ? (
           <div className="tutorialimg-wrapper">
           <img className="tutorialboxs" src={tutorial0}/>
           <img className="tutorialboxs" src={tutorial2}/>
           <img className="tutorialboxs" src={tutorial8}
           onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdCcFuEap6TCvgPGDc1Kz9uOsl68-026qGyjHAZVD90UGY2Rw/viewform?usp=sf_link",
              "_blank"
            )
          }/>
           <img className="tutorialboxs" src={tutorial3}/>
           <img className="tutorialboxs" src={tutorial4}/>
           <img className="tutorialboxs" src={tutorial5}/>
           <img className="tutorialboxs" src={tutorial6}/>
           <img className="tutorialboxs" src={tutorial7}/>
         
           <img className="tutorialboxs" src={tutorial9}/>
          
        </div>):( Swal.fire({

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
