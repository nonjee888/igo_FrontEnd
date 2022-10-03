import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import Tags from "./Tags";
import Post from "../post/Post";

// ~순 카테고리목록
export default function AllPostList() {
  const dispatch = useDispatch();

  const [sort, setSort] = useState("create");
  const [status, setStatus] = useState(false);
  const sortList = [
    {
      name: "create",
      value: "최신순",
    },
    {
      name: "like",
      value: "좋아요순",
    },
    {
      name: "view",
      value: "조회순",
    },
  ];
  useEffect(() => {}, [sort]);
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
  console.log(posts);
  return (
    <div className="All">
      <div className="tag-wrapper">
        {sortList.map((item) => (
          <Tags
            key={item.name}
            selected={sort === item.name}
            handler={() => setSort(item.name)}
            name={item.value}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
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
    </div>
  );
}
