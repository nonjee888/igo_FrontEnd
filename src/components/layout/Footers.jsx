import React from "react";
import "./style.scss";
import listIcon from "../../asset/assetFooter/listIcon.png";
import recomendIcon from "../../asset/assetFooter/recomendIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import addIcon from "../../asset/assetFooter/addIcon.png";
import storyIcon from "../../asset/assetFooter/storyIcon.png";

import { Navigate, useNavigate } from "react-router-dom";

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
          />
        </div>
        <div className="btnbox">
          <img
            className="listIcon"
            onClick={() => {
              navigate("/post");
            }}
            src={listIcon}
          />
        </div>
        <div className="btnbox">
          <img
            className="addIcon"
            onClick={() => {
              navigate("");
            }}
            src={addIcon}
          />
        </div>
        <div className="btnbox">
          <img
            className="storyIcon"
            onClick={() => {
              navigate("/story");
            }}
            src={storyIcon}
          />
        </div>
        <div className="btnbox">
          {" "}
          <img
            className="mypageIcon"
            onClick={() => {
              navigate("/myinfo");
            }}
            src={mypageIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default Footers;
