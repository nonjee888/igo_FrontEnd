import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putMyinfo, getMyinfo } from "../../redux/modules/myinfo";
import Modal from "./MyProfileModal";
//이미지
import profileImg1 from "../../asset/assetMypage/profileImg1.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import edit from "../../asset/edit.png";

const Myinfo = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //관심여행 키워드
  const [interest, setInterest] = useState();
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      dispatch(getMyinfo()).then((response) => {
        if (!response.payload[0].interested) return;
        setInterest(response.payload[0]);
        if (response.payload[0].interested === null) {
          navigate("/choice");
        }
      });
    }
  }, []);
  // console.log(interest?.interested[0]);

  const myinfo = useSelector((state) => state.myinfo.myinfo);
  // console.log(myinfo);
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [preview, setPreview] = useState("");

  const resetStates = () => {
    setNickname("");
    setProfileImage();
  };

  const onChangeImage = (e) => {
    // console.log(e.target.files);
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

    dispatch(putMyinfo(formData));
    resetStates();
    navigate("/myinfo");
  };

  //수정창 모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="All">
      <div className="profileImage">
        {myinfo === undefined ? (
          <>
            <img src={profileImg} alt="프로필이미지" />
          </>
        ) : myinfo[0].profileImage === null ? (
          <>
            <img src={profileImg} alt="프로필이미지" />
            <div className="profileNickname1">
              {myinfo[0]?.nickname}
              <img src={edit} alt="닉네임수정버튼" onClick={openModal} />
            </div>
          </>
        ) : (
          <>
            <img src={myinfo[0].profileImage} alt="프로필이미지" />
            <div className="profileNickname1">
              {myinfo[0]?.nickname}
              <img src={edit} alt="닉네임수정버튼" onClick={openModal} />
            </div>
          </>
        )}
      </div>
      {/* 수정모달창 */}
      <Modal open={modalOpen} close={closeModal}>
        <form onSubmit={onSubmitHandler}>
          {/* 프로필사진 */}
          <div className="profileImage">
            <img
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : profileImg1}
            />
            <label htmlFor="file" className="profileImginputLabel">
              변경하기
            </label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              id="file"
              className="profileImginput"
              onChange={onChangeImage}
            />
          </div>
          {/* 닉네임, 수정버튼 */}
          <div className="profileNickname">
            <input
              type="text"
              value={nickname}
              placeholder="6글자이내"
              className="profileNickameinput"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button type="submit" className="changeButton">
              변경
            </button>
          </div>
        </form>
      </Modal>

      {/* 관심 여행 키워드, 수정버튼 */}
      <div className="profileCategory">
        <div className="CategoryTitle">
          <h3 style={{ margin: "0 0 3% 5%" }}>관심 여행 키워드</h3>
          <img
            src={edit}
            style={{ width: "30px", height: "25px" }}
            alt="태그수정버튼"
            onClick={() => navigate("/choice")}
          />
        </div>
        <div className="categoryGet">
          {myinfo === undefined ? (
            <>선택된 관심 여행 키워드가 없습니다.</>
          ) : interest?.interested[0] === "" ? (
            <>선택된 관심 여행 키워드가 없습니다.</>
          ) : (
            <div style={{ fontWeight: "bold" }}>
              {interest?.interested[0]} | {interest?.interested[1]} |{" "}
              {interest?.interested[2]}
            </div>
          )}
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
