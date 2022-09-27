import React from "react";
import Headers from "../components/layout/Headers";
import PostList from "../components/post/PostList";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const PostPage = () => {
  return (
    <PageContainer>
      <Headers />
      <PostList />
      <Footers />
    </PageContainer>
  );
};

export default PostPage;
