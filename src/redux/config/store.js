import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/comments";
import map from "../modules/map";
import mypage from "../modules/mypage";
import posts from "../modules/posts";
import story from "../modules/story";
import user from "../modules/user";

const store = configureStore({
  reducer: {
    comments,
    map,
    mypage,
    posts,
    story,
    user,
  },
});

export default store;
