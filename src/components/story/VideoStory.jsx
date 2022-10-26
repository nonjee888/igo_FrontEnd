import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStory, deleteStory } from "../../redux/modules/story";
import Swal from "sweetalert2";
//스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//이미지
import profileImg from "../../asset/assetMypage/profileImg.png";
import deleteimg from "../../asset/deleteimg.png";
import video from "../../asset/assetVideo/video.png";

const VideoStory = () => {
  const dispatch = useDispatch();
  const story = useSelector((state) => state.story?.story);
  // console.log(story);
  const writerId = localStorage.getItem("nickname");
  const myinfo = useSelector((state) => state?.myinfo?.myinfo);

  useEffect(() => {
    dispatch(getStory());
  }, [dispatch]);

  return (
    <div className="All">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="videoSwiper"
        style={{ height: "100%" }}
      >
        {story?.map((story) => {
          return (
            <SwiperSlide key={story?.id}>
              <div className="videoUser">
                {story.profileImage === null ? (
                  <img src={profileImg} alt="기본이미지" loading="lazy" />
                ) : (
                  <img
                    src={story?.profileImage}
                    alt="프로필이미지"
                    loading="lazy"
                  />
                )}
                <p>{story?.nickname}</p>
              </div>
              {writerId === story?.nickname ? (
                <div className="storyDelete">
                  <img
                    src={deleteimg}
                    alt="삭제버튼"
                    onClick={() => {
                      Swal.fire({
                        title: "영상삭제",
                        text: "정말로 삭제하시겠어요?",
                        imageUrl: video,
                        imageWidth: 50,
                        imageHeight: 40,
                        showCancelButton: true,
                        confirmButtonColor: "#47AFDB",
                        cancelButtonColor: "#D9D9D9",
                        confirmButtonText: "삭제",
                        cancelButtonText: "취소",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(deleteStory(story.id));
                          // window.location.reload();
                        }
                      });
                    }}
                  />
                </div>
              ) : myinfo === undefined ? (
                <></>
              ) : myinfo[0].nickname === story.nickname ? (
                <div className="storyDelete">
                  <img
                    src={deleteimg}
                    alt="삭제버튼"
                    onClick={() => {
                      Swal.fire({
                        title: "영상삭제",
                        text: "정말로 삭제하시겠어요?",
                        imageUrl: video,
                        imageWidth: 50,
                        imageHeight: 40,
                        showCancelButton: true,
                        confirmButtonColor: "#47AFDB",
                        cancelButtonColor: "#D9D9D9",
                        confirmButtonText: "삭제",
                        cancelButtonText: "취소",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(deleteStory(story.id));
                          // window.location.reload();
                        }
                      });
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              <video
                key={story?.id}
                controls
                controlsList="nodownload"
                width="100%"
                height="100%"
              >
                <source src={story?.video} />
              </video>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoStory;
