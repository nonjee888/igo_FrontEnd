import React,{ useState } from "react";
import Myinfo from "../components/mypage/Myinfo";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyinfo } from "../redux/modules/myinfo";



const MyInfoPage = () => {


  return (
    <PageContainer>
      <Headers />
      <Myinfo/>
      <Footers />
    </PageContainer>
  );
};

export default MyInfoPage;
