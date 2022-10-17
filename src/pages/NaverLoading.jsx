import React from "react";
import Swal from "sweetalert2";
import loading from "../asset/loading.gif";
import { instance } from "../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../shared/cookie";
import { EventSourcePolyfill } from "event-source-polyfill";

const NaverLoading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search); //주소뒤의 ? 가 파라미터를 전달해준다는 뜻 //?code=..이면 주소창이 전달해주는 파라미터의 이름은 code 이다.
  let code = params.get("code");

  useEffect(() => {
    dispatch(naver); //주소창에서 뗀 code를 토큰 가져오는 함수에 보내줌
  }, []);

  // let eventSource = undefined;

  // const isSSE = async () => {
  //   console.log("알림 실행");
  //   eventSource = new EventSourcePolyfill(
  //     process.env.REACT_APP_MAIN_HOST + `/api/member/subscribe`,
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem("ACCESS_TOKKEN"),
  //       },
  //       heartbeatTimeout: 1000 * 60 * 20,
  //     }
  //   ); //구독
  //   console.log("구독성공");
  //   eventSource.addEventListener("sse", function (event) {
  //     const data = JSON.parse(event.data);
  //     (async () => {
  //       // 브라우저 알림
  //       const showNotification = () => {
  //         const notification = new Notification(
  //           "내돈내여로부터 알림이 도착했습니다.",
  //           {
  //             body: data.content,
  //           }
  //         );
  //         console.log("알림성공");
  //         setTimeout(() => {
  //           notification.close();
  //         }, 10 * 1000);

  //         notification.addEventListener("click", () => {
  //           window.open(data.url, "_blank");
  //         });
  //       };

  //       // 브라우저 알림 허용 권한
  //       let granted = false;

  //       if (Notification.permission === "granted") {
  //         granted = true;
  //       } else if (Notification.permission !== "denied") {
  //         let permission = await Notification.requestPermission();
  //         granted = permission === "granted";
  //       }

  //       // 알림 보여주기
  //       if (granted === true) {
  //         showNotification();
  //       }
  //     })();
  //   });
  // };

  const naver = async () => {
    try {
      const data = await instance.get(
        `/naver/callback?code=${code}&state=STATE_STRING`
      );
      // console.log(data);
      setCookie("Authorization", data.headers.authorization);
      localStorage.setItem("ACCESS_TOKEN", data.headers.authorization);
      localStorage.setItem("REFRESH_TOKEN", data.headers.refreshtoken);
      localStorage.setItem("nickname", data.data.data.nickname); //로컬스토리지에 닉넴 저장
      localStorage.setItem("isLogin", data.headers.authorization);
      const nickname = data.data.data.nickname;

      if (data.data.data.interested.length === 1) {
        setTimeout(() => {
          // console.log("로그인");
          // isSSE();

          Swal.fire({
            icon: "success",
            title: nickname + "님",
            text: "관심 태그를 3가지 골라주세요 :)",
            confirmButtonColor: "#47AFDB",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/choice");
            }
          });
        }, 1000);
      } else {
        setTimeout(() => {
          // console.log("로그인");
          // isSSE();
          Swal.fire({
            icon: "success",
            title: nickname + "님",
            text: "환영합니다!",
            confirmButtonColor: "#47AFDB",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/recommend");
            }
          });
        }, 1000);
      }
      return data;
    } catch (error) {
      Swal.fire({
        icon: "success",
        text: error.message,
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/recommend");
        }
      });
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
