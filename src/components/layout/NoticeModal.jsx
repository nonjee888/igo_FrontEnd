import React, { useState } from "react";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import deleteimg from "../../asset/deleteimg.png";
import { getNotice } from "../../redux/modules/notice";
import { removeNotice, confirmNotice } from "../../redux/modules/notice";
import confirm from "../../asset/assetMypage/confirm.png";

const NoticeModal = (props) => {
  const { open, close, header } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notice } = useSelector((state) => state?.notice);
  // console.log(notice);
  const [profile, setProfile] = useState("");
  const [nickname, setNickname] = useState(""); //getMyinfo에서 얻은 유저 닉네임
  const [unRead, setUnread] = useState(""); //읽지 않은 메세지 갯수

  useEffect(() => {
    dispatch(getNotice()).then((res) => {
      setUnread(res.payload.unreadCount);
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
          setProfile(response?.payload[0]?.profileImage);
        }
      });
    }
  }, []);

  return (
    <div className={open ? "openModal modal2" : "modal2"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {" "}
            <>
              <div className="noti-div">
                <div className="noti-title">
                  {notice?.data?.notificationResponses &&
                  notice?.data?.notificationResponses?.length === 0
                    ? `새로운 알림이 없습니다.`
                    : `${unRead && unRead}개의 알림이 있습니다.`}
                </div>
              </div>
              {notice &&
                notice.map((notice) => {
                  return (
                    <div className="noti-div" key={notice.id}>
                      <div className="noti-title">
                        <a href={notice.url} className="noti-btn">
                          {notice.content}
                        </a>
                      </div>
                      {notice.read === null ? (
                        <button
                          className="confirm-button"
                          onClick={() => {
                            dispatch(confirmNotice(notice.id));
                          }}
                        >
                          <img className="noti-confirm" src={confirm} />
                        </button>
                      ) : notice.read === false ? (
                        <button
                          className="confirm-button"
                          onClick={() => {
                            dispatch(confirmNotice(notice.id));
                            window.location.reload();
                          }}
                        >
                          <img className="noti-confirm" src={confirm} />
                        </button>
                      ) : (
                        <button
                          className="x-button"
                          onClick={() => {
                            dispatch(removeNotice(notice.id));
                          }}
                        >
                          <img className="noti-delete" src={deleteimg} />
                        </button>
                      )}
                    </div>
                  );
                })}
            </>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default NoticeModal;
