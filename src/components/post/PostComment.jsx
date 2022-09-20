import React from "react";
import CommentList from "./CommentList";

const PostComment = () => {
  return (
    <>
      <div className="commentContainer">
        <div className="comment-wrapper">
          <div className="nickname-wrap">닉네임</div>
          <input className="comment-input" placeholder="댓글추가..."></input>
          <button className="add-btn">댓글</button>
        </div>
        <div className="commentList">
          <CommentList />
        </div>
      </div>
    </>
  );
};

export default PostComment;
