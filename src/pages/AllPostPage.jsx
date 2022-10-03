import React from "react";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import AllPostList from "../components/category/AllPostList";
import Category from "../components/category/Category";

const AllPostPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category/>
      <AllPostList/>
    </PageContainer>
  );
};

export default AllPostPage;
