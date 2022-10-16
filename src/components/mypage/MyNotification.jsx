import React, { useState } from "react";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import deleteimg from "../../asset/deleteimg.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import { instance } from "../../shared/api";
const MyNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      dispatch(getMyinfo()).then((response) => {
        if (response?.payload[0]?.interested?.length === 1) {
          navigate("/choice");
        } else {
          setNickname(response?.payload[0]?.nickname);
          setProfile(response?.payload[0]?.profileImg);
        }
      });
    }
  }, []);

  const deleteNoti = async () => {
    const data = await instance.delete();
  };

  return (
    <>
      <div className="All">
        <div className="profile-wrap">
          <div className="profileImage">
            {profile === undefined || profile === null ? (
              <img src={profileImg} alt="기본프로필이미지" />
            ) : (
              <img src={profileImg} alt="유저프로필이미지" />
            )}
          </div>
          <div className="noti-nick">{nickname}</div>
        </div>
        <div className="noti-div">
          <div className="noti-title">
            나의 여행을 공유하고 소식을 받아보세요!
          </div>
        </div>
        <div className="noti-div">
          <div className="noti-title">알림내용 맵?</div>
          <button class="x-button" onClick={deleteNoti}>
            <img className="noti-delete" src={deleteimg} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MyNotification;
