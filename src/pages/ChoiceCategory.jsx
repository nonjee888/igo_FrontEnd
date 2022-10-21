import React from "react";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import Choice from "../components/main/Choice";

const ChoiceCategory = () => {
  return (
    <div>
      <PageContainer>
        <Headers />
        <Choice />
      </PageContainer>
    </div>
  );
};

export default ChoiceCategory;
