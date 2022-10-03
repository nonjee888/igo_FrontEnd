import React from "react";
import Headers from "../components/layout/Headers";
import RegionPostList from "../components/category/RegionPostList";
import PageContainer from "../components/wrapper/PageContainer";
import Category from "../components/category/Category";

const RegionPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Category/>
      <RegionPostList/>
    </PageContainer>
  );
};

export default RegionPage;
