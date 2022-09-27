import React from "react";
import Footers from "../components/layout/Footers";

import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import Choice from "../components/main/Choice";

const ChoiceCategory = () => {
  return <div>
    <PageContainer>
    <Headers/>
    <Choice/>
    <Footers/> 
    </PageContainer></div>;
};

export default ChoiceCategory;
