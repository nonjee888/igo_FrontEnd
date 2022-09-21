import React from "react";
import Search from "../components/layout/Search";
import Headers from "../components/layout/Headers";
import ListChanger from "../components/layout/ListChanger";
import PostList from "../components/post/PostList";
import Footers from "../components/layout/Footers";
import PageContainer from "../components/wrapper/PageContainer";

const PostPage = () => {
  return (
      
      <PageContainer>
      <Headers/>
      <Search />
      <ListChanger />
      <PostList/>
      <Footers/>
      </PageContainer>
      
    
 
  );
};

export default PostPage;
