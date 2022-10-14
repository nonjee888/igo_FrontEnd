import React from "react";
import Footers from "../components/layout/Footers";
import Recommend from "../components/main/Recommend";
import Headers from "../components/layout/Headers";
import PageContainer from "../components/wrapper/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyinfo } from "../redux/modules/myinfo";

//메인페이지 추천게시물 페이지
const MainRecommend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      dispatch(getMyinfo()).then((response) => {
        console.log(response.payload[0].interested);
        if (response.payload[0].interested === null) {
          navigate("/choice");
        }
      });
    }
  });
  return (
    <>
      <PageContainer>
        <Headers />
        <Recommend />
        <Footers />
      </PageContainer>
    </>
  );
};

export default MainRecommend;
