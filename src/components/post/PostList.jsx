import "./style.scss";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import Post from "../post/Post";


const PostList = () => {
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state?.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="All">
    
        <div className="content-wrapper">
          {posts?.map((post) => {
            return (
              <Post
                post={post}
                key={post.id}
                createdAt={post.createdAt}
                name={post.nickname}
                profileimage={post.profileimage}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostList;