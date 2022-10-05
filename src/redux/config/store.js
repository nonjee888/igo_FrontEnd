import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import comments from "../modules/comments";
import map from "../modules/map";
import mypage from "../modules/mypage";
import posts from "../modules/posts";
import story from "../modules/story";
import user from "../modules/user";
import myplans from "../modules/myplans";

const store = configureStore({
  reducer: {
    comments,
    map,
    mypage,
    posts,
    story,
    user,
    myplans,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
