import React from "react";
import "./style.scss";
import { navigate,useNavigate } from "react-router-dom";
const Choice= () => {
  const navigate = useNavigate();
  return (

    //전체페이지
  <div className="Choice-wrapper" > 

  {/* 취향선택박스 세로로 3개씩 묶어서 선택가능하도록 했음니다  */}
   <select multiple className="Choice-container">
    
    <option className="Choicebtn">혼자여행</option>
    <option className="Choicebtn">커플여행</option>
    <option className="Choicebtn">가족여행</option>
    </select>
    <select multiple className="Choicebtn-container">
    <option className="Choicebtn">여유로운</option>
    <option className="Choicebtn">액티브</option>
    <option className="Choicebtn">가성비</option>
    </select>
    <select multiple className="Choicebtn-container">
    <option className="Choicebtn">럭셔리</option>
    <option className="Choicebtn">식도락</option>
    <option className="Choicebtn">인스타감성</option>
    </select>
     {/* 이거 버튼 누루면 메인추천페이지로 이동  */}
    <button className="mainrecommendbtn" onClick={() => { navigate("/recommend") }}>취향설정완료</button>
    </div>
    
 

  
  
  );
};
export default Choice;