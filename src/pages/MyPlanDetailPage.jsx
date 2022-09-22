import React from "react";
import MyPlanDetail from "../components/mypage/MyPlanDetail";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const MyPlanDetailPage = () => {
  return (
    <PageContainer>
      <Headers />
      <MyPlanDetail />
      <Footers />
    </PageContainer>
  );
};

export default MyPlanDetailPage;
