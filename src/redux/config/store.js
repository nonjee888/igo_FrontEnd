import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import comments from "../modules/comments";
import map from "../modules/map";
import myinfo from "../modules/myinfo";
import posts from "../modules/posts";
import story from "../modules/story";
import user from "../modules/user";
import myplans from "../modules/myplans";
import mylikes from "../modules/mylikes";
import myposts from "../modules/myposts";

const store = configureStore({
  reducer: {
    comments,
    map,
    posts,
    story,
    user,
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
