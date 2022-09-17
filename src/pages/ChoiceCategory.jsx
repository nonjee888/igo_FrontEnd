import React from "react";
import Footers from "../components/layout/Footers";
import Choice from "../components/main/Choice";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";

const ChoiceCategory = () => {
  return (
    <div>
      <PageContainer>
        <Headers />
        <ChoiceCategory />
        <Footers />
      </PageContainer>
    </div>
  );
};

export default ChoiceCategory;
