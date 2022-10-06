import React from "react";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import AddPost from "../components/post/AddPost";
import Footers from "../components/layout/Footers";

const AddPostPage = (props) => {
  console.log(props);
  return (
    <div>
      <PageContainer>
        <AddPost props={props} />
      </PageContainer>
    </div>
  );
};

export default AddPostPage;
