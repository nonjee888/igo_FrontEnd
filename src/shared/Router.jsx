import axios from "axios";
import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getCookie, setCookie } from "./cookie";
import { EventSourcePolyfill } from "event-source-polyfill";
import { BrowserRouter } from "react-router-dom";
import igoLogo from "../asset/igoLogo.png";

import AddPostPage from "../pages/AddPostPage";
import PostDetailPage from "../pages/PostDetailPage";
import MyInfoPage from "../pages/MyInfoPage";
import MyPlanPostPage from "../pages/MyPlanPostPage";
import StoryAdd from "../pages/StoryAdd";

const KaKaoLoading = lazy(() => import("../pages/KaKaoLoading"));
const NaverLoading = lazy(() => import("../pages/NaverLoading"));
const Loginpage = lazy(() => import("../pages/Loginpage"));
const LoginAdmin = lazy(() => import("../pages/LoginAdmin"));
const ChoiceCategory = lazy(() => import("../pages/ChoiceCategory"));
const MainRecommend = lazy(() => import("../pages/MainRecommend"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const Story = lazy(() => import("../pages/Story"));
const MyLikesPage = lazy(() => import("../pages/MyLikesPage"));
const MyPlanPage = lazy(() => import("../pages/MyPlanPage"));
const MyPostsListPage = lazy(() => import("../pages/MyPostsListPage"));

const AllCategoryList = lazy(() =>
  import("../components/category/AllCategoryList")
);
const Tutorial = lazy(() => import("../components/tutorial/Tutorial"));
const WithDrawal = lazy(() => import("../components/withDrawal/WithDrawal"));

const Router = () => {
  let eventSource = undefined;

  const isSSE = () => {
    eventSource = new EventSourcePolyfill(
      process.env.REACT_APP_MAIN_HOST + `/api/member/subscribe`,
      {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
        },
        heartbeatTimeout: 1000 * 60 * 20,
      }
    ); //구독
    // console.log("구독성공");
    eventSource.addEventListener("sse", function (event) {
      const data = JSON.parse(event.data);
      (async () => {
        // 브라우저 알림
        const showNotification = () => {
          const notification = new Notification(
            "내돈내여로부터 알림이 도착했습니다.",
            {
              body: data.content,
            }
          );
          // console.log("알림성공");
          setTimeout(() => {
            notification.close();
          }, 10 * 1000);

          notification.addEventListener("click", () => {
            window.open(data.url, "_blank");
          });
        };

        // 브라우저 알림 허용 권한
        let granted = false;

        if (Notification.permission === "granted") {
          granted = true;
        } else if (Notification.permission !== "denied") {
          let permission = await Notification.requestPermission();
          granted = permission === "granted";
        }

        // 알림 보여주기
        if (granted === true) {
          showNotification();
        }
      })();
    });
  };

  useEffect(() => {
    if (
      localStorage.getItem("nickname") &&
      localStorage.getItem("ACCESS_TOKEN")
    ) {
      isSSE();
    }

    setInterval(() => {
      if (
        localStorage.getItem("nickname") &&
        localStorage.getItem("ACCESS_TOKEN") &&
        !getCookie("Authorization")
      ) {
        reToken();
        // 쿠키가 삭제되었을 때 토큰 재발급 요청
      }
    }, 1000);
  }, []);

  const reToken = async () => {
    await axios
      .get(process.env.REACT_APP_MAIN_HOST + `/refresh`, {
        headers: { RefreshToken: localStorage.getItem("REFRESH_TOKEN") },
      })
      .then((res) => {
        if (res.data.success === true && res.data.data !== null) {
          localStorage.setItem("ACCESS_TOKEN", res.data.data);
          localStorage.setItem(
            "REFRESH_TOKEN",
            res.config.headers.RefreshToken
          );
          setCookie("Authorization", res.data.data);
        }
      });
  };

  return (
    <div>
      <Suspense
        fallback={
          <div className="All">
            <img
              src={igoLogo}
              style={{
                width: "50%",
                margin: "60% 25% 0 25%",
                display: "block",
              }}
              alt="로고"
            />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/kakaoloading" element={<KaKaoLoading />} exact />
            <Route path="/naverloading" element={<NaverLoading />} exact />
            <Route path="/" element={<Loginpage />} exact />
            <Route path="/login" element={<LoginAdmin />} exact />
            <Route path="/choice" element={<ChoiceCategory />} exact />
            <Route path="/recommend" element={<MainRecommend />} exact />
            <Route path="/post/:category" element={<AllCategoryList />} exact />
            {/*post/:region에서 앞에 :값을 제거해주니 세부카테고리 확인됨 */}
            <Route path="/search/" element={<SearchPage />} exact />
            <Route path="/search/:searchTerm" element={<SearchPage />} exact />
            <Route path="/story" element={<Story />} exact />
            <Route path="/addstory" element={<StoryAdd />} exact />
            <Route path="/myinfo" element={<MyInfoPage />} exact />
            <Route path="/mylike" element={<MyLikesPage />} exact />
            <Route path="/myplan" element={<MyPlanPage />} exact />
            <Route path="/myplanpost" element={<MyPlanPostPage />} exact />
            <Route path="/mypostlist" element={<MyPostsListPage />} exact />
            <Route path="*" element={<div>없는 페이지입니다.</div>} />
            <Route path="/addpost" element={<AddPostPage />} exact />
            <Route path="/addpost/edit/:id" element={<AddPostPage />} exact />
            <Route path="/postdetail/:id" element={<PostDetailPage />} exact />
            <Route path="/tutorial" element={<Tutorial />} exact />
            <Route path="/withdrawal" element={<WithDrawal />} exact />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default Router;
