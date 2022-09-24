import "./style.scss";
import React from "react";
import PostComment from "./PostComment";

const PostDetail = () => {
  return (
    <div className="detail-wrapper">
      <div className="tag-wrapper">태그들어감</div>
      <div className="title-wrapper">
        <h2 className="title">Title</h2>
      </div>
      <div className="content-wrapper"></div>
      <div className="detail-btns">
        <button className="edit-btn">수정</button>
        <button className="delete-btn">삭제</button>
      </div>
      <PostComment />
    </div>
  );
};

export default PostDetail;
