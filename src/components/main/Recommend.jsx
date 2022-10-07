import React from "react";
import "./style.scss";
import recommend from "../../asset/recommend.png";
import { navigate, useNavigate } from "react-router-dom";

//메인페이지 추천게시물

const Recommend = () => {
  const navigate = useNavigate();
  return (
    <div className="All">
      <div className="Recommend-Container">
      <img
          className="Recommend-logo"
          src={recommend}
          alt="추천"
        />
        
      </div>
    </div>
  );
};

export default Recommend;
