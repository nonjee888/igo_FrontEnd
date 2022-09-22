import React from "react";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import TravelStory from "../components/story/TravelStory";


const Story = () => {
  return(
    <PageContainer>
    <Headers/>
    <TravelStory/>
    <Footers/>
    </PageContainer>
    )
};

export default Story;
