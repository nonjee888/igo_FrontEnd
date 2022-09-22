import React from "react";
import Headers from "../components/layout/Headers";
import Search from "../components/layout/Search";
import PostDetail from "../components/post/PostDetail";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const PostDetailPage = () => {
  return (
    <div>
      <PageContainer>
        <Headers />
        <Search />
        <PostDetail />
        <Footers />
      </PageContainer>
    </div>
  );
};

export default PostDetailPage;
