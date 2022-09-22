import "./style.scss";
import Post from "./Post";
import React from "react";
import ScrollContainer from "../wrapper/ScrollContainer";

const PostList = () => {
  return (
    <ScrollContainer>
      <div className="detail-wrapper">
        <div className="content-wrapper">
          <div className="inner-content">
            <Post />
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
};

export default PostList;
