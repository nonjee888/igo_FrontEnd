import React from "react";
import Mylikes from "../components/mypage/Mylikes";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyinfo } from "../redux/modules/myinfo";

const MyLikesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
      dispatch(getMyinfo()).then((response) => {
        if (response.payload[0].interested === null) {
          navigate("/choice");
        }
      });
    }
  });
  return (
    <PageContainer>
      <Headers />
      <Mylikes />
      <Footers />
    </PageContainer>
  );
};

export default MyLikesPage;
