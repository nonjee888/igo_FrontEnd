import React from "react";
import MyPostsList from "../components/mypage/MyPostsList";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyinfo } from "../redux/modules/myinfo";

const MyPostsListPage = () => {
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
      <MyPostsList />
      <Footers />
    </PageContainer>
  );
};

export default MyPostsListPage;
