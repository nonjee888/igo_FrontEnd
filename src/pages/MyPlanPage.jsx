import React from "react";
import Myplan from "../components/mypage/Myplan";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const MyplanPage = () => {
  return (
    <PageContainer>
      <Headers />
      <Myplan />
      <Footers />
    </PageContainer>
  );
};

export default MyplanPage;
