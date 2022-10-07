import "./style.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendPosts } from "../../redux/modules/posts";
import RecommendPost from "./RecommendPost";

//메인페이지 추천게시물

const Recommend = () => {
  const { isLoading, error, recommend } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendPosts());
  }, []);
  if (isLoading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="All">
      <div className="Recommend-Container">
        <div className="Recommend-List">
          <div className="Recommendtitle-wrapper">
            <h2 className="Retitle">안누루고못베기는추천</h2>
          </div>
        </div>
        {recommend?.map((item) => {
          return <RecommendPost item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Recommend;
