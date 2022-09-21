import React from "react";
import Search from "../components/layout/Search";
import Headers from "../components/layout/Headers";
import PostList from "../components/post/PostList";
import ListChanger from "../components/layout/ListChanger";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const PostPage = () => {
  return (
    <PageContainer>
      <Headers />

      <Search />
      <PostList />
      <ListChanger />

      <Footers />
    </PageContainer>
  );
};

export default PostPage;
