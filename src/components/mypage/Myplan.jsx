import React from "react";
import { useNavigate } from "react-router-dom";
import add from "../../asset/add.png";
import deleteimg from "../../asset/deleteimg.png";
import edit from "../../asset/edit.png";

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
          <div className="MyplanDate">2022/09/22</div>
          <div className="MyplanTitle">
            제목
            <img src={edit} alt="수정하기" />
          </div>
          <img src="" className="MyplanImg" alt="내일정이미지" />
          <div className="MyplanContents">여기에 내용</div>
          <button className="buttonDelete">
            <img src={deleteimg} style={{ width: "17%" }} alt="삭제버튼" />
          </button>
          <button className="buttonAll">완료</button>
        </div>
        <h3 style={{ marginTop: "15%" }}>완료된 일정</h3>
        <div className="Myplan">
          <div className="MyplanDate1">2022/09/22</div>
          <div className="MyplanTitle1">
            제목
            <img src={edit} alt="수정하기" />
          </div>
          <img src="" className="MyplanImg" alt="내일정이미지완료" />
          <div className="MyplanContents">여기에 내용</div>
          <button className="buttonDelete">
            <img src={deleteimg} style={{ width: "17%" }} alt="삭제버튼" />
          </button>
          <button className="buttonAll">취소</button>
        </div>
      </div>
    </div>
  );
};

export default Myplan;
