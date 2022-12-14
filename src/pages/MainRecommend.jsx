import React from "react";
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
    if (
      localStorage.getItem("ACCESS_TOKEN") &&
      localStorage.getItem("nickname")
    ) {
      dispatch(getMyinfo()).then((response) => {
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
      </PageContainer>
    </>
  );
};

export default MainRecommend;
