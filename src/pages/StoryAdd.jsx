import React from "react";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import AddStory from "../components/story/AddStory";



const Story = () => {
  return(
    <PageContainer>
      <Headers/>
      <AddStory/>
      <Footers/>
    </PageContainer>
    );
};

export default Story;
