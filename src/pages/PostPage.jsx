import React from "react";
import Search from "../components/layout/Search";
import Headers from "../components/layout/Headers";
import ListChanger from "../components/layout/ListChanger";
import ScrollContainer from "../components/wrapper/ScrollContainer";
import Footers from "../components/layout/Footers";
import Headerbar from "../components/layout/Headerbar";
import PageContainer from "../components/wrapper/PageContainer";

const PostPage = () => {
  return (
    
      
      
      <PageContainer>
      <Headers/>
      
      <Search />
      <ListChanger />
     
      <Footers/>
      </PageContainer>
      
    
 
  );
};

export default PostPage;
