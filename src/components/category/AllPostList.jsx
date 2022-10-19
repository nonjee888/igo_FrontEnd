import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";
import Post from "../post/Post";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// ~순 카테고리목록
export default function AllPostList() {
  const [sort, setSort] = useState("create");
  const [posts, setPosts] = useState();
  const [lastPost, setLastPost] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = 8;

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

  const getPosts = async () => {
    const response = await instance.get(`/api/posts/group?type=${sort}`);
    setPosts(response.data.data);
    return response.data.data;
  };

  // const getLastPost = async () => {
  //   const data = await instance.get(
  //     `/api/posts/create/articles?lastArticleId=${}&size=${}`
  //   );
  //   console.log(data);
  // };

  useEffect(() => {
    getPosts();
    // getLastPost(lastArticleId, size)
  }, [sort]);

  // useEffect(()=>{
  //   const onScroll = ()=> {
  //     if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight   -10){
  //       if()
  //     }
  //   }
  // },[])

  return (
    <div className="postListAll">
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
          {sort === "create"
            ? posts &&
              posts?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : sort === "heart"
            ? posts &&
              posts?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : posts &&
              posts?.map((post) => {
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
