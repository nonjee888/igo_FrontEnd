import "./style.scss";
import React from "react";
import Search from "../layout/Search";
import Category from "../category/Category";

const PostList = () => {
  return (
    <div className="All">
      <Category/>
      <Search />
    </div>
  );
};

export default PostList;
