import { configureStore } from "@reduxjs/toolkit";
import comments from "../modules/comments";
import myinfo from "../modules/myinfo";
import posts from "../modules/posts";
import story from "../modules/story";
import notice from "../modules/notice";
import myplans from "../modules/myplans";
import mylikes from "../modules/mylikes";
import myposts from "../modules/myposts";

const store = configureStore({
  reducer: {
    comments,
    posts,
    story,
    notice,
    myinfo,
    myplans,
    mylikes,
    myposts,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
