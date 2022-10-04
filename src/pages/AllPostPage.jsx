import React from "react";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import AllPostList from "../components/category/AllPostList";
import Category from "../components/category/Category";
import Footers from "../components/layout/Footers";

const AllPostPage = () => {
  return (
    <PageContainer>
      <Headers />
      <AllPostList />
      <Footers />
    </PageContainer>
  );
};

export default AllPostPage;
