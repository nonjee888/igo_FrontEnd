import React, { useState } from "react";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotice } from "../../redux/modules/notice";
import { removeNotice, confirmNotice } from "../../redux/modules/notice";
//이미지
import confirm from "../../asset/assetMypage/confirm.png";
import deleteimg from "../../asset/deleteimg.png";
import noticeImg from "../../asset/assetFooter/noticeImg.png";

const NoticeModal = (props) => {
  const { open, close, header } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notice } = useSelector((state) => state?.notice);
  // console.log(notice);
  const [unRead, setUnread] = useState(""); //읽지 않은 메세지 갯수

  useEffect(() => {
    dispatch(getNotice()).then((res) => {
      setUnread(res.payload.unreadCount);
    });
  }, [dispatch]);

  useEffect(() => {
    if (
      !localStorage.getItem("ACCESS_TOKEN") &&
      !localStorage.getItem("nickname")
    )
      return;
    if (
      localStorage.getItem("ACCESS_TOKEN") &&
      localStorage.getItem("nickname")
    ) {
      dispatch(getMyinfo()).then((response) => {
        if (response?.payload[0]?.interested?.length === 1) {
          navigate("/choice");
        }
      });
    }
  }, []);

  // 읽음상태 필터로 뽑아내기
  let NotRead = notice?.filter((v) => v.read === false);
  // console.log(NotRead);
  let Read = notice?.filter((v) => v.read === true);
  // console.log(Read);

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
            <>
              {notice.length === 0 ? (
                <div className="NoNotice">
                  새로운 <img src={noticeImg} alt="알림종" loading="lazy" />이
                  없습니다.
                </div>
              ) : (
                <>
                  <h4 style={{ marginLeft: "5%" }}>새로운 알림</h4>
                  {NotRead.length === 0 ? (
                    <div className="NoticeRead">새로운 알림이 없습니다.</div>
                  ) : (
                    <>
                      {notice &&
                        notice.map((notice) => {
                          if (notice && notice.read === false) {
                            return (
                              <div className="noti-div" key={notice.id}>
                                <div className="noti-title">
                                  <a href={notice.url} className="noti-btn">
                                    {notice.content}
                                  </a>
                                </div>
                                <button
                                  className="confirm-button"
                                  onClick={() => {
                                    dispatch(confirmNotice(notice.id));
                                  }}
                                >
                                  <img
                                    className="noti-confirm"
                                    src={confirm}
                                    loading="lazy"
                                  />
                                </button>
                              </div>
                            );
                          }
                        })}
                    </>
                  )}

                  <h4 style={{ marginLeft: "5%" }}>확인한 알림</h4>
                  {Read.length === 0 ? (
                    <div className="NoticeRead">확인한 알림이 없습니다.</div>
                  ) : (
                    <>
                      {notice &&
                        notice.map((notice) => {
                          if (notice.read === true) {
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
                                  <img
                                    className="noti-delete"
                                    src={deleteimg}
                                  />
                                </button>
                              </div>
                            );
                          }
                        })}
                    </>
                  )}
                </>
              )}
            </>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default NoticeModal;
