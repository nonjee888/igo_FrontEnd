import React from "react";
import MyPostsList from "../components/mypage/MyPostsList";
import Headers from "../components/layout/Headers";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const MyPostsListPage = () => {
  return (
    <PageContainer>
      <Headers />
      <MyPostsList />
      <Footers />
    </PageContainer>
  );
};

export default MyPostsListPage;
