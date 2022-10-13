import "./style.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStory } from "../../redux/modules/story";
//스와이퍼
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//이미지
import profileImg from "../../asset/assetMypage/profileImg1.png";

const VideoStory = () => {
  const dispatch = useDispatch();
  const story = useSelector((state) => state.story?.story);
  console.log(story);

  // 리덕스에서 리스트를 로딩
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
                  <img src={profileImg} alt="기본이미지" />
                ) : (
                  <img src={story?.profileImage} alt="프로필 이미지" />
                )}
                <p>{story?.nickname}</p>
              </div>
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
