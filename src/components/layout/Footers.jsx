import "./style.scss";
import Swal from "sweetalert2";
//이미지
import pleaseLogin from "../../asset/pleaseLogin.png";
import listIcon from "../../asset/assetFooter/listIcon.png";
import recomendIcon from "../../asset/assetFooter/recomendIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import addIcon from "../../asset/assetFooter/addIcon.png";
import igomodalimg from "../../asset/igomodalimg.png";
import storyIcon from "../../asset/assetFooter/storyIcon.png";
import pleaseLogin from "../../asset/pleaseLogin.png";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotice } from "../../redux/modules/notice";

const Footers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NICKNAME = localStorage.getItem("nickname");
  const { notice } = useSelector((state) => state.notice);

  //로그인해야 사용 가능
  const Alert = () => {
    Swal.fire({
      text: "로그인을 하셔야 이용 가능합니다.",
      imageUrl: pleaseLogin,
      imageWidth: 200,
      imageHeight: 100,
      showCancelButton: true,
      confirmButtonColor: "#47AFDB",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "로그인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };
  //글작성하기 / 포스트/스토리
  const Add = () => {
    Swal.fire({
      showDenyButton: true,
      showCancelButton: true,
      imageUrl: igomodalimg,
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonColor: "#47AFDB",
      denyButtonColor: "#47AFDB",
      confirmButtonText: "여행남기기",
      denyButtonText: "영상남기기",
      cancelButtonColor: "#D9D9D9",
      cancelButtonText: "닫기",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/addpost");
      } else if (result.isDenied) {
        navigate("/addstory");
      }
    });
  };

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  return (
    <div className="Footer-Container">
      {NICKNAME === null ? (
        <div className="Icon-box">
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={Alert}
              src={recomendIcon}
              alt="추천"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/post/all");
              }}
              src={listIcon}
              alt="리스트"
            />
          </div>
          <>
            <div className="btnbox">
              <img
                className="FootersIcon"
                onClick={Alert}
                src={addIcon}
                alt="등록"
              />
            </div>
          </>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={Alert}
              src={storyIcon}
              alt="스토리"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={Alert}
              src={mypageIcon}
              alt="마이페이지"
            />
          </div>
        </div>
      ) : (
        <div className="Icon-box">
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/recommend");
              }}
              src={recomendIcon}
              alt="추천"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/post/all");
              }}
              src={listIcon}
              alt="리스트"
            />
          </div>
          <>
            <div className="btnbox">
              <img
                className="FootersIcon"
                onClick={Add}
                src={addIcon}
                alt="등록"
              />
            </div>
          </>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/story");
              }}
              src={storyIcon}
              alt="스토리"
            />
          </div>
          <div className="btnbox">
            <img
              className="FootersIcon"
              onClick={() => {
                navigate("/myinfo");
              }}
              src={mypageIcon}
              alt="마이페이지"
            />
            {notice.length !== 0 ? <div className="notification" /> : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footers;
