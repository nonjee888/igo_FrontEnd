import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postMyinfo } from "../../redux/modules/myinfo";
//이미지
import profileImg from "../../asset/assetMypage/profileImg1.png";
import edit from "../../asset/edit.png";

const Myinfo = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const NICKNAME = localStorage.getItem("nickname");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [preview, setPreview] = useState("");

  const resetStates = () => {
    setNickname("");
    setProfileImage();
  };

  const onChangeImage = (e) => {
    console.log(e.target.files);
    setProfileImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let req = {
      nickname: nickname,
    };
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    let json = JSON.stringify(req);

    const nicknameblob = new Blob([json], { type: "application/json" });
    formData.append("nickname", nicknameblob);

    dispatch(postMyinfo(formData));
    resetStates();
    navigate("/myinfo");
    // window.location.reload();
  };

  return (
    <div className="All">
      <form onSubmit={onSubmitHandler}>
        {/* 프로필사진 */}
        <img
          alt="이미지를 업로드 해주세요."
          src={preview ? preview : profileImg}
          style={{ display: "block", margin: "auto", width: "20%" }}
        />
        <input
          style={{
            display: "block",
            margin: "0 23%",
            height: "100%",
          }}
          type="file"
          accept="image/*"
          name="profileImage"
          className="imginput"
          onChange={onChangeImage}
          multiple="multiple"
        />
        {/* 닉네임, 수정버튼 */}
        <div className="profileNickname">
          <input
            type="text"
            placeholder={NICKNAME}
            value={nickname}
            style={{ border: "none" }}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <button
            type="submit"
            style={{ border: "none", background: "transparent" }}
          >
            <img
              src={edit}
              style={{ width: "30px", height: "25px" }}
              alt="닉네임수정버튼"
            />
          </button>
        </div>
      </form>
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
