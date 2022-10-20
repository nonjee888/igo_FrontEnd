import React from "react";
import Headers from "../components/layout/Headers";
import MyNotification from "../components/mypage/MyNotification";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const Notice = () => {
  return (
    <>
      <PageContainer>
        <Headers />
        <MyNotification />
        <Footers />
      </PageContainer>
    </>
  );
};

export default Notice;
