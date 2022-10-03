import React from "react";
import Headers from "../components/layout/Headers";
import PostList from "../components/post/PostList";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import Category from "../components/category/Category";


const PostPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category/>
      <PostList />
      <Footers />
    </PageContainer>
  );
};

export default PostPage;
