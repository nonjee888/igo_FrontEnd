import React from "react";
import "./style.scss";
import listIcon from "../../asset/assetFooter/listIcon.png";
import recomendIcon from "../../asset/assetFooter/recomendIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import addIcon from "../../asset/assetFooter/addIcon.png";
import storyIcon from "../../asset/assetFooter/storyIcon.png";

import { useNavigate } from "react-router-dom";

const Footers = () => {
  const navigate = useNavigate();

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
        <div className="btnbox">
          <img
            className="FootersIcon"
            onClick={() => {
              navigate("");
            }}
            src={addIcon}
            alt="등록"
          />
        </div>
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
