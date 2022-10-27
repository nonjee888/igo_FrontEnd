import "./style.scss";
import recom from "../../asset/recom.png";
import igoLogo from "../../asset/igoLogo.png";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendPosts } from "../../redux/modules/posts";
import RecommendPost from "./RecommendPost";
import pleaseLogin from "../../asset/pleaseLogin.png";
import Swal from "sweetalert2";

//메인페이지 추천게시물

const Recommend = () => {
  const { isLoading, error, recommend } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const NICKNAME = localStorage.getItem("nickname");
  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    dispatch(getRecommendPosts());
  }, []);
  if (isLoading) {
    return (
      <div className="All">
        <img
          src={igoLogo}
          style={{ width: "50%", margin: "80% 25% 0 25%", display: "block" }}
          alt="내돈내여"
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="All">
        <div className="sorry">
          <img
            style={{ width: "100%", height: "100%", marginBottom: "10%" }}
            src={pleaseLogin}
            alt="sorry"
          />
        </div>
        <div style={{ textAlign: "center" }}>죄송합니다 다시 시도해주세요.</div>
      </div>
    );
  }

  return (
    <>
      {NICKNAME && token ? (
        <div className="All">
          <div className="Recommend-Container">
            <img
              className="Recommend-logo"
              loading="lazy"
              src={recom}
              alt="추천"
            />
            <div className="Recommend-List">
              {recommend?.map((item) => {
                return <RecommendPost item={item} key={item.id} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        Swal.fire({
          icon: "error",
          text: "로그인을 하셔야 이용 가능합니다.",
          confirmButtonColor: "#47AFDB",
          cancelButtonColor: "#D9D9D9",
          confirmButtonText: "로그인하러가기",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/");
          }
        })
      )}
    </>
  );
};

export default Recommend;
