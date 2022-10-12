import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStory } from "../../redux/modules/story";

const VideoStory = () => {
  const dispatch = useDispatch();
  const story = useSelector((state) => state.story?.story);
  console.log(story);

  // 리덕스에서 리스트를 로딩
  useEffect(() => {
    dispatch(getStory());
  }, [dispatch]);

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexWrap: "wrap",
    //   }}
    // >
    //   {story?.map((story) => {
    <>
      <embed
        type="video/webm"
        src={story?.video}
        width="250"
        height="200"
      ></embed>
    </>
    //   })}
    // </div>
  );
};

export default VideoStory;
