import React from "react";
import Search from "../components/layout/Search";
import ListChanger from "../components/layout/ListChanger";
import ScrollContainer from "../components/wrapper/ScrollContainer";

const PostPage = () => {
  return (
    <ScrollContainer>
      <Search />
      <ListChanger />
    </ScrollContainer>
  );
};

export default PostPage;
