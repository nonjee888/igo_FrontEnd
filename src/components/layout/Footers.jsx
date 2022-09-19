import React from "react";
import "./style.scss";
import heartIcon from "../../asset/assetFooter/heartIcon.png";
import writeIcon from "../../asset/assetFooter/writeIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import { Navigate,useNavigate } from "react-router-dom";

const Footers = () => {
 const navigate = useNavigate();

  return (
    <div className="Footer-Container">
      <div className="Icon-box">
      <div className="btnbox"><img className="HeartIcon" onClick={() => { navigate("/mylike") }} src={heartIcon} /></div>
      <div className="btnbox"><img className="writeIcon" onClick={() => { navigate("") }} src={writeIcon} /></div>
      <div className="btnbox"> <img className="mypageIcon" onClick={() => { navigate("/myinfo") }} src={mypageIcon} /></div>
    </div>
    </div>
  )
};

export default Footers;
