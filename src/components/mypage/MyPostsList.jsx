import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import photo from "../../asset/assetMypage/photo.png";

const MyPostsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts);
  // console.log(posts);

  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const user = localStorage.getItem("nickname");

  let MyPostsList = posts?.filter((post) => {
    return post?.member?.nickname === user;
  });
  console.log(MyPostsList);

  let urlRegex = /(https?:\/\/[^>\"']*)/;
  let url = MyPostsList[1]?.content?.match(urlRegex)?.["1"];
  console.log(url);

  return (
    <div className="All">
      <div className="MyPosts">
        <h3>나의 작성 게시글</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {MyPostsList?.map((posts) => {
            return (
              <div
                key={posts.id}
                onClick={() => {
                  navigate("/postdetail/" + posts.id);
                }}
              >
                <div className="MyPostsList">
                  {url === null ? (
                    <img
                      src={photo}
                      className="MyPostImg"
                      alt="내게시글이미지"
                    />
                  ) : (
                    <img src={url} className="MyPostImg" alt="내게시글이미지" />
                  )}
                  <div className="MyPostTitle">{posts.title}</div>
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
