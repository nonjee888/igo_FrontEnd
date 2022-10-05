import { useState } from "react";
import AddPostPage from "../pages/AddPostPage";
import KaKaoLoading from "../pages/KaKaoLoading";
import NaverLoading from "../pages/NaverLoading";
import Loginpage from "../pages/Loginpage";
import ChoiceCategory from "../pages/ChoiceCategory";
import MainRecommend from "../pages/MainRecommend";
//카테고리추가해서 페이지로 이동할거
import PostDetailPage from "../pages/PostDetailPage";
//카테고리추가해서 페이지로 이동할거
import CreateStory from "../pages/CreateStory";
import SearchPage from "../pages/SearchPage";
import Story from "../pages/Story";
import MyInfoPage from "../pages/MyInfoPage";
import MyLikesPage from "../pages/MyLikesPage";
import MyPlanPage from "../pages/MyPlanPage";
import MyPlanPostPage from "../pages/MyPlanPostPage";
import MyPostsListPage from "../pages/MyPostsListPage";
import StoryAdd from "../pages/StoryAdd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllCategoryList from "../components/category/AllCategoryList";

const Router = () => {
  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  });
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/kakaoloading" element={<KaKaoLoading />} exact />
          <Route path="/naverloading" element={<NaverLoading />} exact />
          <Route path="/" element={<Loginpage />} exact />
          <Route path="/choice" element={<ChoiceCategory />} exact />
          <Route path="/recommend" element={<MainRecommend />} exact />
          <Route path="/post/:category" element={<AllCategoryList />} exact />
          {/*post/:region에서 앞에 :값을 제거해주니 세부카테고리 확인됨 */}
          <Route path="/createstory" element={<CreateStory />} exact />
          <Route path="/search" element={<SearchPage />} exact />
          <Route path="/story" element={<Story />} exact />
          <Route path="/addstory" element={<StoryAdd />} exact />
          <Route path="/myinfo" element={<MyInfoPage />} exact />
          <Route path="/mylike" element={<MyLikesPage />} exact />
          <Route path="/myplan" element={<MyPlanPage />} exact />
          <Route path="/myplanpost" element={<MyPlanPostPage />} exact />
          <Route path="/mypostlist" element={<MyPostsListPage />} exact />
          <Route path="*" element={<div>없는 페이지입니다.</div>} />
          <Route
            path="/addpost"
            element={
              <AddPostPage
                overlayData={overlayData}
                setOverlayData={setOverlayData}
              />
            }
            exact
          />
          <Route
            path="/addpost/edit/:id"
            element={
              <AddPostPage
                overlayData={overlayData}
                setOverlayData={setOverlayData}
              />
            }
            exact
          />
          <Route
            path="/postdetail/:id"
            element={
              <PostDetailPage
                overlayData={overlayData}
                setOverlayData={setOverlayData}
              />
            }
            exact
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
