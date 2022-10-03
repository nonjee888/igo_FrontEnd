import React from "react";
import AddPostPage from "../pages/AddPostPage";
import KaKaoLoading from "../pages/KaKaoLoading";
import NaverLoading from "../pages/NaverLoading";
import Loginpage from "../pages/Loginpage";
import ChoiceCategory from "../pages/ChoiceCategory";
import MainRecommend from "../pages/MainRecommend";
import PostPage from "../pages/PostPage";
//카테고리추가해서 페이지로 이동할거
import RegionPage from "../pages/RegionPage";
import LikePage from "../pages/AllPostPage";
import CostPage from "../pages/CostPage";
import AllPostPage from "../pages/AllPostPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostEdit from "../components/post/PostEdit";
//카테고리추가해서 페이지로 이동할거
import CreateStory from "../pages/CreateStory";
import Story from "../pages/Story";
import MyInfoPage from "../pages/MyInfoPage";
import MyLikesPage from "../pages/MyLikesPage";
import MyPlanPage from "../pages/MyPlanPage";
import MyPlanPostPage from "../pages/MyPlanPostPage";
import MyPostsListPage from "../pages/MyPostsListPage";
import StoryAdd from "../pages/StoryAdd";

import { BrowserRouter, Route, Routes } from "react-router-dom";


const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/kakaoloading" element={<KaKaoLoading />} exact />
          <Route path="/naverloading" element={<NaverLoading />} exact />
          <Route path="/" element={<Loginpage />} exact />
          <Route path="/choice" element={<ChoiceCategory />} exact />
          <Route path="/recommend" element={<MainRecommend />} exact />
          <Route path="/post" element={<PostPage />} exact />
          <Route path="/post/:region" element={<RegionPage />} exact />
          <Route path="/post/:like" element={<LikePage />} exact />
          <Route path="/post/:cost" element={<CostPage />} exact />
          <Route path="/post/:all" element={<AllPostPage />} exact />
          <Route path="/region" element={<RegionPage />} exact />
          <Route path="/addpost" element={<AddPostPage />} exact />
          <Route path="/postdetail/:id" element={<PostDetailPage />} exact />
          <Route path="/postedit" element={<PostEdit />} exact />
          <Route path="/createstory" element={<CreateStory />} exact />
          <Route path="/story" element={<Story />} exact />
          <Route path="/addstory" element={<StoryAdd />} exact />
          <Route path="/myinfo" element={<MyInfoPage />} exact />
          <Route path="/mylike" element={<MyLikesPage />} exact />
          <Route path="/myplan" element={<MyPlanPage />} exact />
          <Route path="/myplanpost" element={<MyPlanPostPage />} exact />
          <Route path="/mypostlist" element={<MyPostsListPage />} exact />
          <Route path="*" element={<div>없는 페이지입니다.</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
