import React from "react";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import LikePostList from "../components/category/LikePostList";
import Category from "../components/category/Category";

const LikePage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category/>
      <LikePostList/>
    </PageContainer>
  );
};

export default LikePage;
