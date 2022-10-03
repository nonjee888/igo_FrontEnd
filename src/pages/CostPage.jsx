import React from "react";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import CostPostList from "../components/category/CostPostList";
import Category from "../components/category/Category";

const CostPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category/>
      <CostPostList/>
    </PageContainer>
  );
};

export default CostPage;
