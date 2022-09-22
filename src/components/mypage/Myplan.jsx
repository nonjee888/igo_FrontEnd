import React from "react";
import { useNavigate } from "react-router-dom";
import add from "../../asset/add.png";
import deleteimg from "../../asset/deleteimg.png";

const Myplan = () => {
  let navigate = useNavigate();
  return (
    <div className="All">
      <div className="MyPosts">
        <div className="planTitle">
          <h3>나의 일정</h3>
          <img
            src={add}
            className="planAdd"
            alt="일정추가하기"
            onClick={() => {
              navigate("/myplanpost");
            }}
          />
        </div>
        <div className="Myplan">
          <div className="MyplanDate">2022.09.22</div>
          <div className="MyplanTitle">제목</div>
          <img src="" className="MyplanImg" alt="내게시글이미지" />
          <div className="MyplanContents">여기에 내용</div>
          <button>
            <img src={deleteimg} style={{ width: "20%" }} alt="" />
          </button>
          <button>완료</button>
        </div>
      </div>
    </div>
  );
};

export default Myplan;
