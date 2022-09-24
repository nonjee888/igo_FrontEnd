import React from "react";
import PostCommentList from "./PostCommentList";

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
          <PostCommentList />
        </div>
      </div>
    </>
  );
};

export default PostComment;
