import "./style.scss";
import Post from "./Post";
import React from "react";

const PostList = () => {
  return (
    <div className="detail-wrapper">
      <div className="content-wrapper">
        <div className="inner-content">
          <Post />
        </div>
      </div>
    </div>
  );
};

export default PostList;
