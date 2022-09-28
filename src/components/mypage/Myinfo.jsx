import "./style.scss";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//이미지
import profileImg from "../../asset/assetMypage/profileImg1.png";
import edit from "../../asset/edit.png";

const Myinfo = () => {
  let navigate = useNavigate();
  const NICKNAME = localStorage.getItem("nickname");
  //프로필 이미지
  const [Image, setImage] = useState(profileImg);
  const fileInput = useRef(null);
  const onChange = (e) => {
    // if (e.target.files[0]) {
    //   setFile(e.target.files[0]);
    // } else {
    //   //업로드 취소할 시
    //   setImage(profileImg);
    //   return;
    // }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="All">
      {/* 프로필사진 */}
      <img
        className="imgBox"
        src={Image}
        onClick={() => {
          fileInput.current.click();
        }}
        alt=""
      />
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      {/* 닉네임, 수정버튼 */}
      <div className="profileNickname">
        {NICKNAME}
        <img
          src={edit}
          style={{ width: "30px", height: "25px" }}
          alt="닉네임수정버튼"
        />
      </div>
      {/* 관심 여행 키워드, 수정버튼 */}
      <div className="profileCategory">
        <div className="CategoryTitle">
          <h3 style={{ margin: "0 0 3% 5%" }}>관심 여행 키워드</h3>
          <img
            src={edit}
            style={{ width: "7%", height: "7%" }}
            alt="태그수정버튼"
          />
        </div>
        <div className="categoryGet">
          여기에카테고리겟으로가져오기 혼자 | 식도락| 액티브 |룰라랄라라라
        </div>
      </div>
      {/* 모아보기, 나의 일정 */}
      <div className="myListAll">
        <p
          onClick={() => {
            navigate("/mypostlist");
          }}
        >
          작성 게시글 모아보기
        </p>
        <p
          onClick={() => {
            navigate("/mylike");
          }}
        >
          🤍게시글 모아보기
        </p>
        <p
          onClick={() => {
            navigate("/myplan");
          }}
        >
          나의 일정 관리하기
        </p>
      </div>
    </div>
  );
};

export default Myinfo;
