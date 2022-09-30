import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//이미지
import listIcon from "../../asset/assetFooter/listIcon.png";
import recomendIcon from "../../asset/assetFooter/recomendIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import addIcon from "../../asset/assetFooter/addIcon.png";
import storyIcon from "../../asset/assetFooter/storyIcon.png";
import ChoiceAdd from "../modal/ChoiceAdd";

const Footers = () => {
  const navigate = useNavigate();
  const NICKNAME = localStorage.getItem("nickname");
  //로그인해야 사용 가능
  const Alert = () => {
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
        navigate("/");
      }
    });
  };

  let [modal, setModal] = useState(false); //modal창은 false로 보이지 않는 상태
  const close = () => {
    setModal(false);
  };

  return (
    <div className="Footer-Container">
      {NICKNAME === null ? (
        <div className="Icon-box">
          <div className="btnbox">
            <img
              className="recomendIcon"
              onClick={Alert}
              src={recomendIcon}
              alt="추천"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/post");
              }}
              src={listIcon}
              alt="리스트"
            />
          </div>
          <>
            {modal ? <ChoiceAdd close={close} /> : null}
            <div className="btnbox">
              <img
                className="FootersIcon"
                onClick={Alert}
                src={addIcon}
                alt="등록"
              />
            </div>
          </>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={Alert}
              src={storyIcon}
              alt="스토리"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={Alert}
              src={mypageIcon}
              alt="마이페이지"
            />
          </div>
        </div>
      ) : (
        <div className="Icon-box">
          <div className="btnbox">
            <img
              className="recomendIcon"
              onClick={() => {
                navigate("/recommend");
              }}
              src={recomendIcon}
              alt="추천"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/post");
              }}
              src={listIcon}
              alt="리스트"
            />
          </div>
          <>
            {modal ? <ChoiceAdd close={close} /> : null}
            <div className="btnbox">
              <img
                className="FootersIcon"
                onClick={() => {
                  setModal(true);
                }}
                src={addIcon}
                alt="등록"
              />
            </div>
          </>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/story");
              }}
              src={storyIcon}
              alt="스토리"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/myinfo");
              }}
              src={mypageIcon}
              alt="마이페이지"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Footers;
