import React, { useState }from "react";
import "./style.scss";
import listIcon from "../../asset/assetFooter/listIcon.png";
import recomendIcon from "../../asset/assetFooter/recomendIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import addIcon from "../../asset/assetFooter/addIcon.png";
import storyIcon from "../../asset/assetFooter/storyIcon.png";
import ChoiceAdd from "../modal/ChoiceAdd";

import { Navigate, useNavigate } from "react-router-dom";

const Footers = () => {
  const navigate = useNavigate();
  
  let [modal, setModal] = useState(false); //modal창은 false로 보이지 않는 상태
  const close = () => {
    setModal(false);
  };

  return (
    <div className="Footer-Container">
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
    </div>
  );
};

export default Footers;
