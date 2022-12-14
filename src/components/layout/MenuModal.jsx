import "./style.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../shared/cookie";
//이미지
import pleaseLogin from "../../asset/pleaseLogin.png";
import listIcon from "../../asset/assetFooter/listIcon.png";
import recomendIcon from "../../asset/assetFooter/recomendIcon.png";
import mypageIcon from "../../asset/assetFooter/mypageIcon.png";
import addIcon from "../../asset/assetFooter/addIcon.png";
import igomodalimg from "../../asset/addmadal.png";
import storyIcon from "../../asset/assetFooter/storyIcon.png";
import logout from "../../asset/assetFooter/logout.png";
import login from "../../asset/assetFooter/login.png";
import research from "../../asset/assetFooter/research.png";
import service from "../../asset/assetFooter/service.png";

const MenuModal = (props) => {
  const { open, close, header } = props;

  const navigate = useNavigate();
  const NICKNAME = localStorage.getItem("nickname");
  const token = localStorage.getItem("ACCESS_TOKEN");

  //로그아웃
  const logoutHandler = () => {
    Swal.fire({
      icon: "question",
      title: "로그아웃",
      text: "정말로 로그아웃하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#47AFDB",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("Authorization");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("nickname");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("isLogin");
        navigate("/");
        window.location.reload();
      }
    });
  };

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
      imageWidth: 250,
      imageHeight: 230,
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

  return (
    <div className={open ? "openModal modal1" : "modal1"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {NICKNAME === null || token === null ? (
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
                    onClick={Alert}
                    src={mypageIcon}
                    alt="마이페이지"
                  />
                </div>
                <a
                  className="btnbox"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdsfPmx_yGOkDb8NgbZSGBGjUx6uVnmke-j6Vm7ptsqSHDphg/viewform?vc=0&c=0&w=1&flr=0"
                  target="_blank"
                >
                  <img
                    src={service}
                    alt="관리자문의"
                    loading="lazy"
                    className="FootersIcon"
                  />
                </a>
                <div
                  className="btnbox"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img
                    src={login}
                    alt="로그인회원가입"
                    className="FootersIcon"
                  />
                </div>
                <button className="research" onClick={Alert}>
                  <img src={research} alt="리서치커피받으세요" />
                </button>
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
                </div>
                <a
                  className="btnbox"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdsfPmx_yGOkDb8NgbZSGBGjUx6uVnmke-j6Vm7ptsqSHDphg/viewform?vc=0&c=0&w=1&flr=0"
                  target="_blank"
                >
                  <img src={service} alt="관리자문의" className="FootersIcon" />
                </a>
                <div className="btnbox" onClick={logoutHandler}>
                  <img
                    src={logout}
                    loading="lazy"
                    alt="로그아웃"
                    className="FootersIcon"
                  />
                </div>
                <button
                  className="research"
                  onClick={() => {
                    navigate("/tutorial");
                  }}
                >
                  <img src={research} loading="lazy" alt="리서치커피받으세요" />
                </button>
              </div>
            )}
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default MenuModal;
