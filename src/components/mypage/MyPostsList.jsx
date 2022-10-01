import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/posts";

const MyPostsList = (props) => {
  const navigate = useNavigate();
  let id = props.post.id;
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.data);
  console.log(posts);

  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  console.log(posts?.data?.data);

  const REFRESH_TOKEN = localStorage.getItem("REFRESH_TOKEN");

  let Mypostslist = posts.filter((post) => {
    return post.REFRESH_TOKEN === REFRESH_TOKEN;
  });
  return (
    <div className="All">
      <div className="MyPosts">
        <h3>나의 작성 게시글</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Mypostslist.map((post) => {
            return (
              <div
                onClick={() => {
                  navigate("/postdetail/" + id);
                }}
              >
                <div className="MyPostsList">
                  <img src="" className="MyPostImg" alt="내게시글이미지" />
                  <div className="MyPostTitle">{post.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPostsList;
