import "./style.scss";
import recom from "../../asset/recom.png";
import igoLogo from "../../asset/igoLogo.png";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendPosts } from "../../redux/modules/posts";
import RecommendPost from "./RecommendPost";
import pleaseLogin from "../../asset/pleaseLogin.png";

//메인페이지 추천게시물

const Recommend = () => {
  const { isLoading, error, recommend } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

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
      <div className="All" style={{ marginLeft: "10%" }}>
        <img
          style={{ width: "100%", height: "100%", marginBottom: "10%" }}
          src={pleaseLogin}
        />
        죄송합니다 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="All">
      <div className="Recommend-Container">
        <img className="Recommend-logo" src={recom} alt="추천" />
        <div className="Recommend-List">
          {recommend?.map((item) => {
            return <RecommendPost item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
