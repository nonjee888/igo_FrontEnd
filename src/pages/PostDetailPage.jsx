import React from "react";
import Headers from "../components/layout/Headers";
import PostDetail from "../components/post/PostDetail";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import PostDetailFooters from "../components/post/PostDetailFooters";

const PostDetailPage = (props) => {
  return (
    <PageContainer>
      <Headers />
      <PostDetail props={props} />
      <PostDetailFooters />
    </PageContainer>
  );
};

export default PostDetailPage;
