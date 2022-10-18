import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";
import Post from "../post/Post";
import { useNavigate } from "react-router-dom";

// ~순 카테고리목록
export default function AllPostList() {
  const [sort, setSort] = useState("create");
  const [create, setCreate] = useState();
  const [like, setLike] = useState();
  const [view, setView] = useState();
  const navigate = useNavigate();

  const sortList = [
    {
      name: "create",
      value: "최신순",
    },
    {
      name: "heart",
      value: "좋아요순",
    },
    {
      name: "view",
      value: "조회순",
    },
  ];

  const getCreatePost = async () => {
    const response = await instance.get(`/api/posts/group?type=${sort}`);
    setCreate(response.data.data);
    setLike(response.data.data);
    setView(response.data.data);

    return response.data.data;
  };

  useEffect(() => {
    getCreatePost();
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
            ? create &&
              create?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : sort === "heart"
            ? like &&
              like?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : view &&
              view?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })}
        </div>
        <button
          className="research"
          onClick={() => {
            navigate("/tutorial");
          }}
        >
          튜토리얼보고 커피받기
        </button>
      </div>
    </div>
  );
}
