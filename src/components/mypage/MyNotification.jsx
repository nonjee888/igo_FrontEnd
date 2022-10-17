import React, { useState } from "react";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import deleteimg from "../../asset/deleteimg.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import { getNotice } from "../../redux/modules/notice";
import { removeNotice } from "../../redux/modules/notice";

const MyNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notice = useSelector((state) => state?.notice.notice);

  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState(""); //getMyinfo에서 얻은 유저 닉네임
  const [unRead, setUnread] = useState(""); //읽지 않은 메세지 갯수

  useEffect(() => {
    dispatch(getNotice()).then((res) => {
      setUnread(res?.payload.data.unreadCount);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("ACCESS_TOKEN")) return;
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
            {notice?.data?.notificationResponses?.length === 0
              ? `새로운 알림이 없습니다.`
              : `${unRead}개의 알림이 있습니다.`}
          </div>
        </div>
        {notice?.data?.notificationResponses &&
          notice?.data?.notificationResponses?.map((notice) => {
            return (
              <div className="noti-div" key={notice.id}>
                <div className="noti-title">
                  <a href={notice.url} className="noti-btn">
                    {notice.content}
                  </a>
                </div>
                <button
                  className="x-button"
                  onClick={() => {
                    dispatch(removeNotice(notice.id));
                  }}
                >
                  <img className="noti-delete" src={deleteimg} />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyNotification;
