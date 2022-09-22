import React from "react";
import Footers from "../components/layout/Footers";
import Recommend from "../components/main/Recommend";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";

//메인페이지 추천게시물 페이지
const MainRecommend = () => {
  return(
  
    <>
    <PageContainer>
    <Headers/>
    <Recommend/>
    <Footers/>
    </PageContainer>
  </>
  )
};

export default MainRecommend;
