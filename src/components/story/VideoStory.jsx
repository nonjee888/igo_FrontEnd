import React from "react";
import Stories from "react-insta-stories";

const NICKNAME = localStorage.getItem("nickname");

const initialStories = [
  {
    url: "https://imgur.com/sucHqgt.mp4",
    type: "video",
    header: {
      heading: NICKNAME,
      profileImage: "https://avatars.githubusercontent.com/u/108657283?v=4",
    },
  },
  {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    type: "video",
    header: {
      heading: NICKNAME,
      profileImage: "https://avatars.githubusercontent.com/u/108657283?v=4",
    },
  },
  {
    url: "https://i.imgur.com/Zo5Kpnd.mp4",
    type: "video",
    header: {
      heading: NICKNAME,
      profileImage: "https://avatars.githubusercontent.com/u/108657283?v=4",
    },
  },
];
const VideoStory = () => {
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
        loop={true}
        keyboardNavigation={true}
        isPaused={() => {}}
        currentIndex={() => {}}
        onStoryStart={() => {}}
        onStoryEnd={() => {}}
        onAllStoriesEnd={() => {}}
      />
    </React.Fragment>
  );
};

export default VideoStory;
