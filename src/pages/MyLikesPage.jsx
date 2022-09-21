import React from "react";
import Mylikes from "../components/mypage/Mylikes";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const MyLikesPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Mylikes />
      <Footers />
    </PageContainer>
  );
};

export default MyLikesPage;
