import React from "react";
import Headers from "../components/layout/Headers";
import PostDetail from "../components/post/PostDetail";
import PageContainer from "../components/wrapper/PageContainer";

const PostDetailPage = () => {
  return (
    <PageContainer>
      <Headers />
      <PostDetail />
    </PageContainer>
  );
};

export default PostDetailPage;
