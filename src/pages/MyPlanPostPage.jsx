import React from "react";
import MyPlanPost from "../components/mypage/MyPlanPost";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const MyPlanPostPage = () => {
  return (
    <PageContainer>
      <Headers />
      <MyPlanPost />
      <Footers />
    </PageContainer>
  );
};

export default MyPlanPostPage;
