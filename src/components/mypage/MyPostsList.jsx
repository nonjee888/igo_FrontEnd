import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyposts } from "../../redux/modules/myposts";
import photo from "../../asset/assetMypage/photo.png";

const MyPostsList = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts);
  const myposts = useSelector((state) => state.myposts.myposts);
  console.log(myposts);

  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getMyposts());
  }, [dispatch]);

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
          {myposts?.map((myposts) => {
            return (
              <div
                key={myposts.id}
                onClick={() => {
                  navigate("/postdetail/" + posts.id);
                }}
              >
                <div className="MyPostsList">
                  {myposts.thumnai === null ? (
                    <img src={photo} className="MyPostImg" alt="" />
                  ) : (
                    <img src={myposts.thumnail} className="MyPostImg" alt="" />
                  )}

                  <div className="MyPostTitle">{myposts.title}</div>
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
