import "./style.scss";
import React from "react";
import Search from "../layout/Search";
import ListChanger from "../layout/ListChanger";
const PostList = () => {
  return (
    <div className="All">
      <Search />
      <ListChanger />
    </div>
  );
};

export default PostList;
