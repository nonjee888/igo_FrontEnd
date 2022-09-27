import React from "react";
import AddPostPage from "../pages/AddPostPage";
import KaKaoLoading from "../pages/KaKaoLoading";
import NaverLoading from "../pages/NaverLoading";
import Loginpage from "../pages/Loginpage";
import ChoiceCategory from "../pages/ChoiceCategory";
import MainRecommend from "../pages/MainRecommend";
import PostPage from "../pages/PostPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostEdit from "../components/post/PostEdit";
import CreateStory from "../pages/CreateStory";
import Story from "../pages/Story";
import MyInfoPage from "../pages/MyInfoPage";
import MyLikesPage from "../pages/MyLikesPage";
import MyPlanPage from "../pages/MyPlanPage";
import MyPlanPostPage from "../pages/MyPlanPostPage";
import MyPostsListPage from "../pages/MyPostsListPage";
import StoryAdd from "../pages/StoryAdd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../redux/modules/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      // Storage에 token 저장된 값이 있다면 isLogin 상태를 true로 바꿔주는 함수로 보냄
      dispatch(loginCheck()); //app.js에서 실행될때마다 항상 로컬스토리지에 토큰이 있나 없나보고 state의 isLogin상태를 바꿔줌
    }
  }, []);
  const userlogin = useSelector((state) => state.user);
  const checklogin = userlogin.isLogin;
  console.log(checklogin); //로그인 상태 체크

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
