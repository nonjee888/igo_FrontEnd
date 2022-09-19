import React from "react";
import Search from "../components/layout/Search";
import Headers from "../components/layout/Headers";
import ListChanger from "../components/layout/ListChanger";
import ScrollContainer from "../components/wrapper/ScrollContainer";
import Footers from "../components/layout/Footers";
import Headerbar from "../components/layout/Headerbar";

const PostPage = () => {
  return (
    <div>
      <Headers/>
      <ScrollContainer>
      <Headerbar/>
      <Search />
      <ListChanger />
    </ScrollContainer>
    <Footers/>
 </div>
  );
};

export default PostPage;
