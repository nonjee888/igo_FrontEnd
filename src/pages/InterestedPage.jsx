import React from "react";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import InterestedPostList from "../components/category/InterestedPostList";
import Category from "../components/category/Category";
import Footers from "../components/layout/Footers";

const InterestedPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category />
      <InterestedPostList />
      <Footers />
    </PageContainer>
  );
};

export default InterestedPage;
