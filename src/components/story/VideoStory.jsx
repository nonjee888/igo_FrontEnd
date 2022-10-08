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
    <div className="All">
      <div
        className="videoAll"
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {story?.map((story) => {
          return (
            <video controls width="100%" key={story.id} autoplay poster>
              <source src={story.video}></source>
            </video>
          );
        })}
      </div>
    </div>
  );
};

export default VideoStory;
