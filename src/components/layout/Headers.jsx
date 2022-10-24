import React, { useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useEffect } from "react";
import Modal from "./MenuModal";
import Modal2 from "./NoticeModal";
//이미지
import igoLogo from "../../asset/igoLogo.png";
import menu from "../../asset/assetFooter/menu.png";
import notice from "../../asset/assetFooter/notice.png";

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myinfo = useSelector((state) => state?.myinfo?.myinfo);
  const notice1 = useSelector((state) => state?.notice.notice);

  //메뉴모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //알림모달
  const [modalOpen2, setModalOpen2] = useState(false);
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  useEffect(() => {
    if (
      localStorage.getItem("ACCESS_TOKEN") &&
      localStorage.getItem("nickname")
    )
      dispatch(getMyinfo());
  }, []);

  const NICKNAME = localStorage.getItem("nickname");

  return (
    <div className="Header-wrapper">
      <img
        className="Logo"
        onClick={() => {
          navigate("/post/all"); // 나중에 /recommend로 바꾸기
        }}
        src={igoLogo}
        alt="로고"
      />
      <div className="hearders-nickWrap">
        {NICKNAME === null ? (
          <></>
        ) : myinfo === undefined ? (
          <>
            <div className="headers-님">
              <div
                className="headers-nick"
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  color: "#555555",
                }}
              >
                {NICKNAME}
              </div>
              님
            </div>
            <div className="noticeButton" onClick={openModal2}>
              <img src={notice} alt="알림" />
              {notice1.length !== 0 ? <div className="notification" /> : null}
            </div>
          </>
        ) : (
          <>
            <div className="headers-님">
              <div
                className="headers-nick"
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  color: "#555555",
                }}
              >
                {myinfo[0].nickname}
              </div>
              님
            </div>
            <div className="noticeButton" onClick={openModal2}>
              <img src={notice} alt="알림" />
              {notice1.length !== 0 ? <div className="notification" /> : null}
            </div>
          </>
        )}
      </div>
      <Modal2 open={modalOpen2} close={closeModal2} />
      <button className="Menu" onClick={openModal}>
        <img src={menu} alt="메뉴" />
      </button>
      <Modal open={modalOpen} close={closeModal} />
    </div>
  );
};

export default Headers;
