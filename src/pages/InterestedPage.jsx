import React from "react";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import InterestedPostList from "../components/category/InterestedPostList";
import Category from "../components/category/Category";

const InterestedPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category/>
      <InterestedPostList/>
    </PageContainer>
  );
};

export default InterestedPage;
