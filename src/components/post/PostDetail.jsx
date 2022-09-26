import "./style.scss";
import React from "react";
import PostComment from "./PostComment";
import Search from "../layout/Search";
const PostDetail = () => {
  return (
    <>
      <div className="All">
        <div className="detail-wrapper">
          <div className="tag-wrapper">태그들어감</div>
          <div className="detail-title">
            <h4 className="title">제목</h4>
          </div>
          <div className="detail-content">에디터내용</div>
          <div className="map-wrapper">지도보일곳</div>
          <div className="detail-btns">
            <button className="edit-btn">수정</button>
            <button className="delete-btn">삭제</button>
          </div>
        </div>
        <PostComment />
      </div>
    </>
  );
};

export default PostDetail;
