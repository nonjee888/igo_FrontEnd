import React from "react";
import Headers from "../components/layout/Headers";
import PostDetail from "../components/post/PostDetail";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const PostDetailPage = () => {
  return (
    <PageContainer>
      <Headers />
      <PostDetail />
      <Footers />
    </PageContainer>
  );
};

export default PostDetailPage;
