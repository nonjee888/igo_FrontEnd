import React from "react";
import Swal from "sweetalert2";
import loading from "../asset/loading.gif";
import { instance } from "../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverLoading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search); //주소뒤의 ? 가 파라미터를 전달해준다는 뜻 //?code=..이면 주소창이 전달해주는 파라미터의 이름은 code 이다.
  let code = params.get("code");
  // console.log(code); //주소창에서 localhost3000/naverloading/?code= ....  에서 code= "~~~" 가져오기

  const notice = async () => {
    const response = await instance.get("/api/member/subscribe");
    console.log("구독성공");
    response.addEventListener("sse", function (event) {
      console.log(event.data);

      const data = JSON.parse(event.data);

      (async () => {
        //브라우저 알림
        const showNotification = () => {
          const notification = new Notification("알림옴", {
            body: data.content,
          });

          setTimeout(() => {
            notification.close();
          }, 10 * 1000);

          notification.addEventListener("click", () => {
            window.open(data.url, "_blank");
          });
        };

        //브라우저 알림 허용 권한

        let granted = false;

        if (Notification.permission === "granted") {
          granted = true;
        } else if (Notification.permission !== "denied") {
          let permission = await Notification.requestPermission();
          granted = permission === "granted";
        }
        //알림 보여주기
        if (granted) {
          showNotification();
        }
      })();
    });
  };

  useEffect(() => {
    dispatch(naver); //주소창에서 뗀 code를 토큰 가져오는 함수에 보내줌
  }, []);

  const naver = async () => {
    try {
      const data = await instance.get(
        `/naver/callback?code=${code}&state=STATE_STRING`
      );
      // console.log(data);
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname); //로컬스토리지에 닉넴 저장
      localStorage.setItem("isLogin", data.headers.authorization);
      const nickname = data.data.data.nickname;

      notice();
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: nickname + "님",
          text: "환영합니다!",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/post/all"); // 나중에 /recommend로 바꾸기
          }
        });
      }, 1000);

      return data;
    } catch (error) {
      console.log("error", error);
      window.alert(error.message); //navigate로 바꾸면 isLogin.state가 false. 새로고침해야 true
    }
  };
  return (
    <>
      <img
        src={loading}
        alt="로딩이미지"
        style={{ width: "50%", margin: "60% 25% 0 25%", display: "block" }}
      />
    </>
  );
};
export default NaverLoading;
