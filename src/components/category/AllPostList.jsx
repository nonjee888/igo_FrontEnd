import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";
import Post from "../post/Post";

// ~순 카테고리목록
export default function AllPostList() {
  const [sort, setSort] = useState("create");
  const [create, setCreate] = useState();
  const [like, setLike] = useState();
  const [view, setView] = useState();

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

  const getCreatePost = async () => {
    const response = await instance.get(`/api/post/group?type=create`);
    setCreate(response.data.data);
    return response.data.data;
  };
  const getHeartPost = async () => {
    const response = await instance.get(`/api/post/group?type=heart`);
    setLike(response.data.data);
    return response.data.data;
  };
  const getViewPost = async () => {
    const response = await instance.get(`/api/post/group?type=view`);
    setView(response.data.data);
    return response.data.data;
  };

  useEffect(() => {
    getCreatePost();
    getHeartPost();
    getViewPost();
  }, [sort]);

  return (
    <div className="postListAll">
      <div className="tag-wrapper">
        {sortList.map((item) => (
          <Tags
            key={item.name}
            selected={sort === item.name}
            handler={() => setSort(item.name)}
            name={item.value}
            onClick={() => {}}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
        <div className="content-wrapper">
          {sort === "create"
            ? create?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : sort === "like"
            ? like?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : view?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })}
        </div>
      </div>
    </div>
  );
}
