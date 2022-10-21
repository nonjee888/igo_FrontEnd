import React from "react";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import VideoStory from "../components/story/VideoStory";

const Story = () => {
  return (
    <PageContainer>
      <Headers />
      <VideoStory />
      <Footers />
    </PageContainer>
  );
};

export default Story;
