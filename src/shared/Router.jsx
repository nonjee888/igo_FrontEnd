import React from "react";
import KaKaoLoading from "../pages/KaKaoLoading";
import NaverLoading from "../pages/NaverLoading";
import Loginpage from "../pages/Loginpage";
import ChoiceCategory from "../pages/ChoiceCategory";
import MainRecommend from "../pages/MainRecommend";
import PostPage from "../pages/PostPage";
import PostDetailPage from "../pages/PostDetailPage";
import CreateStory from "../pages/CreateStory";
import Story from "../pages/Story";
import MyInfoPage from "../pages/MyInfoPage";
import MyLikesPage from "../pages/MyLikesPage";
import MyPlanPage from "../pages/MyPlanPage";
import MyPlanPostPage from "../pages/MyPlanPostPage";
import MyPostsListPage from "../pages/MyPostsListPage";
import MyPlanDetail from "../components/mypage/MyPlanDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/kakaoloading" element={<KaKaoLoading />} exact />
          <Route path="/naverloading" element={<NaverLoading />} exact />
          <Route path="/login" element={<Loginpage />} exact />
          <Route path="/choice" element={<ChoiceCategory />} exact />
          <Route path="/recommend" element={<MainRecommend />} exact />
          <Route path="/post" element={<PostPage />} exact />
          <Route path="/postdetail/:id" element={<PostDetailPage />} exact />
          <Route path="/createstory" element={<CreateStory />} exact />
          <Route path="/story" element={<Story />} exact />
          <Route path="/myinfo" element={<MyInfoPage />} exact />
          <Route path="/mylike" element={<MyLikesPage />} exact />
          <Route path="/myplan" element={<MyPlanPage />} exact />
          <Route path="/myplanpost" element={<MyPlanPostPage />} exact />
          <Route path="/myplandetail/:id" element={<MyPlanDetail />} exact />
          <Route path="/mypostlist" element={<MyPostsListPage />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
