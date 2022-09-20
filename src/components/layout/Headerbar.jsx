import React from "react";
import {  navigate,useNavigate } from "react-router-dom";
import "./style.scss";





const Headerbar = () => {

  const navigate = useNavigate();
 
  return (
    <div className="Headerbar-Container">
      <button className="Choicebtn" onClick={() => { navigate("/recommend") }}>여행지추천</button>
      <button className="Choicebtn" onClick={() => { navigate("/post") }}>게시글</button>
      <button className="Choicebtn" onClick={() => { navigate("/story") }}>스토리</button>


</div>

  )


};

export default Headerbar;
