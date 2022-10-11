import React, { useEffect } from "react";
import Stories from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import story, { getStory } from "../../redux/modules/story";

const VideoStory = () => {
  const dispatch = useDispatch();
  const story = useSelector((state) => state.story?.story);
  // console.log(story);

  // 리덕스에서 리스트를 로딩
  useEffect(() => {
    dispatch(getStory());
  }, [dispatch]);

  const initialStories = [
    {
      url: "https://igobucbuc.s3.ap-northeast-2.amazonaws.com/fdd55f8c-72c7-43c6-bbaf-a73fe6a177e8-KakaoTalk_20220929_205739630.mp4",
      type: "video",
      header: {
        heading: "파인애플",
        profileImage:
          "https://igobucbuc.s3.ap-northeast-2.amazonaws.com/f3f2bad9-3dbb-48a3-b4db-3b56be19bd42-20220511510353.jpg",
      },
    },
    {
      url: "https://igobucbuc.s3.ap-northeast-2.amazonaws.com/fdd55f8c-72c7-43c6-bbaf-a73fe6a177e8-KakaoTalk_20220929_205739630.mp4",
      type: "video",
      header: {
        heading: "파인애플",
        profileImage:
          "https://igobucbuc.s3.ap-northeast-2.amazonaws.com/f3f2bad9-3dbb-48a3-b4db-3b56be19bd42-20220511510353.jpg",
      },
    },
    {
      url: "https://igobucbuc.s3.ap-northeast-2.amazonaws.com/fdd55f8c-72c7-43c6-bbaf-a73fe6a177e8-KakaoTalk_20220929_205739630.mp4",
      type: "video",
      header: {
        heading: "파인애플",
        profileImage:
          "https://igobucbuc.s3.ap-northeast-2.amazonaws.com/f3f2bad9-3dbb-48a3-b4db-3b56be19bd42-20220511510353.jpg",
      },
    },
  ];
  const [stories, setStories] = React.useState(initialStories);
  return (
    <React.Fragment>
      <Stories
        stories={stories}
        defaultInterval={1500}
        width={"100%"}
        height={"80vh"}
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        // loop={true}
        keyboardNavigation={true}
        isPaused={() => {}}
        currentIndex={() => {}}
        onStoryStart={() => {}}
        // onStoryEnd={(s, st) => {
        //   console.log("story ended", s, st);
        // }}
        onStoryEnd={() => {}}
        onAllStoriesEnd={() => {}}
      />
    </React.Fragment>
  );
};

export default VideoStory;
