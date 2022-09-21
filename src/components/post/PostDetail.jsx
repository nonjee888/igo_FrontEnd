import "./style.scss";
import React from "react";
import PostComment from "./PostComment";
import ScrollContainer from "../wrapper/ScrollContainer";

const PostDetail = () => {
  return (
    <ScrollContainer>
      <div className="detail-wrapper">
        <div className="tag-wrapper">태그들어감</div>
        <div className="title-wrapper">
          <h2 className="title">Title</h2>
        </div>
        <div className="content-wrapper">
          {/* <div className="pic-wrapper">
              <img className="img-container" src=""></img>
              <img className="icon-heart" src="" />
            </div>
            <div className="map-wrapper">지도</div>
            <div className="body-wrapper">body</div>

            <div className="total-price">total price</div> */}
        </div>
        <div className="detail-btns">
          <button className="edit-btn">수정</button>
          <button className="delete-btn">삭제</button>
        </div>
        <PostComment />
      </div>
    </ScrollContainer>
  );
};

export default PostDetail;
