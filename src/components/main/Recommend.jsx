import React from "react";
import "./style.scss";
import { navigate, useNavigate } from "react-router-dom";

//메인페이지 추천게시물

const Recommend = () => {
  const navigate = useNavigate();
  return (
    <div className="All">
      <div className="Recommend-Container">
        <div className="Recommend-List">
          <div className="Recommendtitle-wrapper">
            <h2 className="Retitle">안누루고못베기는추천</h2>
          </div>
          <img
            className="Preview-image"
            src="https://youimg1.tripcdn.com/target/0106j1200093s90ih82FB_C_640_320_R5_Q70.jpg_.webp?proc=source%2Ftrip"
            onClick={() => {
              navigate("/postdetail/:id");
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Recommend;
