import AddPostPage from "../pages/AddPostPage";
import KaKaoLoading from "../pages/KaKaoLoading";
import NaverLoading from "../pages/NaverLoading";
import Loginpage from "../pages/Loginpage";
import LoginAdmin from "../pages/LoginAdmin";
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
import Notice from "../pages/Notice";
import StoryAdd from "../pages/StoryAdd";
import { Route, Routes } from "react-router-dom";
import AllCategoryList from "../components/category/AllCategoryList";
import { useEffect } from "react";
import axios from "axios";
import Tutorial from "../components/tutorial/Tutorial";
import { getCookie, setCookie } from "./cookie";
import { EventSourcePolyfill } from "event-source-polyfill";
import { instance } from "./api";


const Router = () => {
 let eventSource = undefined;
  let token = localStorage.getItem("ACCESS_TOKEN");

  const isSSE = async () => {
    eventSource = new EventSourcePolyfill(
      process.env.REACT_APP_MAIN_HOST + `/api/member/subscribe`,
      {
        headers: {
          Authorization: token,
        },
        heartbeatTimeout: 1000 * 60 * 20,
      }
    ); //구독
    console.log("구독성공");
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
          console.log("알림성공");
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
    })
  };

  useEffect(() => {
    isSSE();

    setInterval(() => {
      if (!getCookie("Authorization")) {
        reToken();
        // window.alert("쿠키확인");
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
          <Route path="/createstory" element={<CreateStory />} exact />
          <Route path="/search/" element={<SearchPage />} exact />
          <Route path="/search/:searchTerm" element={<SearchPage />} exact />
          <Route path="/story" element={<Story />} exact />
          <Route path="/addstory" element={<StoryAdd />} exact />
          <Route path="/myinfo" element={<MyInfoPage />} exact />
          <Route path="/mylike" element={<MyLikesPage />} exact />
          <Route path="/myplan" element={<MyPlanPage />} exact />
          <Route path="/myplanpost" element={<MyPlanPostPage />} exact />
          <Route path="/mypostlist" element={<MyPostsListPage />} exact />
          <Route path="/notification" element={<Notice />} exact />
          <Route path="*" element={<div>없는 페이지입니다.</div>} />
          <Route path="/addpost" element={<AddPostPage />} exact />
          <Route path="/addpost/edit/:id" element={<AddPostPage />} exact />
          <Route path="/postdetail/:id" element={<PostDetailPage />} exact />
          <Route path="/tutorial" element={<Tutorial />} exact />
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default Router;
