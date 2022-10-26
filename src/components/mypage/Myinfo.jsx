import "./style.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putMyinfo, getMyinfo } from "../../redux/modules/myinfo";
import { getNotice } from "../../redux/modules/notice";
import Modal from "./MyProfileModal";
import Swal from "sweetalert2";
//이미지
import profileImg1 from "../../asset/assetMypage/profileImg1.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import edit from "../../asset/edit.png";
import love from "../../asset/assetMypage/love1.png";

const Myinfo = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //관심여행 키워드
  const [interest, setInterest] = useState();
  const [unRead, setUnread] = useState(0);
  useEffect(() => {
    if (
      localStorage.getItem("ACCESS_TOKEN") &&
      localStorage.getItem("nickname")
    ) {
      dispatch(getMyinfo()).then((response) => {
        if (!response.payload[0].interested) return;
        setInterest(response.payload[0]);
        setNickname(response.payload[0].nickname);
        if (response.payload[0].interested === null) {
          navigate("/choice");
        }
        dispatch(getNotice()).then((res) => {
          setUnread(res.payload.unreadCount);
        });
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
    if (nickname === "" || preview === "") {
      Swal.fire({
        icon: "info",
        text: "사진을 첨부해주세요🥰",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    } else {
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
    }
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
            <img src={profileImg} alt="프로필이미지" loading="lazy" />
          </>
        ) : myinfo[0].profileImage === null ? (
          <>
            <img src={profileImg} alt="프로필이미지" loading="lazy" />
            <div className="profileNickname1">
              {myinfo[0]?.nickname}
              <img
                src={edit}
                alt="닉네임수정버튼"
                onClick={openModal}
                loading="lazy"
              />
            </div>
          </>
        ) : (
          <>
            <img
              src={myinfo[0].profileImage}
              alt="프로필이미지"
              loading="lazy"
            />
            <div className="profileNickname1">
              {myinfo[0]?.nickname}
              <img
                src={edit}
                alt="닉네임수정버튼"
                onClick={() => {
                  Swal.fire({
                    title: "프로필변경",
                    text: "사진과 닉네임을 모두 수정시 변경가능합니다.",
                    showCancelButton: true,
                    confirmButtonColor: "#47AFDB",
                    cancelButtonColor: "#D9D9D9",
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      openModal();
                    }
                  });
                }}
              />
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
              maxlength="6"
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
            style={{ width: "30px", height: "25px", cursor: "pointer" }}
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
          className="noticeImg"
          onClick={() => {
            navigate("/mylike");
          }}
        >
          <img src={love} alt="좋아요" loading="lazy" />
          게시글 모아보기
        </p>
        <p
          onClick={() => {
            navigate("/myplan");
          }}
        >
          나의 일정 관리하기
        </p>
        <p
          onClick={() => {
            navigate("/withdrawal");
          }}
        >
          회원탈퇴
        </p>
      </div>
    </div>
  );
};

export default Myinfo;
