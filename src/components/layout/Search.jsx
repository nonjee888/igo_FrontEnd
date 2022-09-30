import "./style.scss";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import search from "../../asset/search.png";
import Post from "../post/Post";
import { getPosts } from "../../redux/modules/posts";

const Search = () => {
  const dispatch = useDispatch();
  const Status = [
    { status: 2, value: "최신순으로 보기" },
    { status: 1, value: "추천순으로 보기" },
    { status: 3, value: "조회순으로 보기" },
  ];
  const onSelectHandler = (e) => {
    setContent(e.currentTarget.value);
  };
  const inputEl = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState(2);
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
    if (searchTerm !== "") {
      const Status = [
        { status: 2, value: "최신순으로 보기" },
        { status: 1, value: "추천순으로 보기" },
        { status: 3, value: "조회순으로 보기" },
      ];
      // let latestPosts = posts.filter((post) => {
      //   return post의 createdAt 내림차순 정렬 === 2;
      // });
      // let likedPosts = posts.filter((post) => {
      //   return post 좋아요 숫자 내림차순 정렬 === 1;
      // });
      // let hotPosts = posts.filter((post) => {
      //   return post 조회수 내림차순 정렬 === 3;
      // });
    }
  };
  const { isLoading, error, posts } = useSelector((state) => state?.posts);
  console.log(posts);
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
      <div className="input-wrapper">
        <input
          type="search"
          className="SearchBar"
          value={searchTerm}
          onChange={getSearchTerm}
          ref={inputEl}
        />
        <img className="Icon" src={search} />
      </div>
      <div className="changer-wrapper">
        <select
          className="input-selector"
          onChange={onSelectHandler}
          value={content}
        >
          {Status.map((posts) => (
            <option
              status={posts.status}
              value={posts.value}
              key={posts.status}
            >
              {posts.value}
            </option>
          ))}
        </select>
      </div>
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

        {/* {content == 2
            ? latestPosts.map((post) => {
                return (
                  <Post
                    movie={post}
                    key={post.id}
                    id={post.id}
                    status={post.status}
                  />
                );
              })
            : content == 1
            ? likedPosts.map((post) => {
                return (
                  <Post
                    movie={post}
                    key={post.id}
                    id={post.id}
                    status={post.status}
                  />
                );
              })
            : hotPosts.map((post) => {
                return (
                  <Post
                    movie={post}
                    key={post.id}
                    id={post.id}
                    status={post.status}
                  />
                );
              })} */}
      </div>
    </>
  );
};

export default Search;
