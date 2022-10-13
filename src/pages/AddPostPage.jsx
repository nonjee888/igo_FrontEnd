import React from "react";
import PageContainer from "../components/wrapper/PageContainer";
import Headers from "../components/layout/Headers";
import AddPost from "../components/post/AddPost";
import Footers from "../components/layout/Footers";

const AddPostPage = () => {
  return (
    <div>
      <PageContainer>
        <AddPost />
      </PageContainer>
    </div>
  );
};

export default AddPostPage;
