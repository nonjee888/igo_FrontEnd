import React from "react";
import Myinfo from "../components/mypage/Myinfo";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const MyInfoPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Myinfo />
      <Footers />
    </PageContainer>
  );
};

export default MyInfoPage;
