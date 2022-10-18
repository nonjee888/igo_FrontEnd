import "./style.scss";
import recom from "../../asset/recom.png";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendPosts } from "../../redux/modules/posts";
import RecommendPost from "./RecommendPost";

//메인페이지 추천게시물

const Recommend = () => {
  const { isLoading, error, recommend } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  // const tags = useSelector((state) => state.tags.tags);
  // console.log

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
