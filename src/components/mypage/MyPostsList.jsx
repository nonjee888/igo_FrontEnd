import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyposts } from "../../redux/modules/myposts";
import photo from "../../asset/assetMypage/photo.png";

const MyPostsList = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const myposts = useSelector((state) => state.myposts.myposts);
  // console.log(myposts);

  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getMyposts());
  }, [dispatch]);

  return (
    <div className="All">
      <div className="MyPosts">
        <h3>나의 작성 게시글</h3>
        <div className="MyListsAll">
          {myposts?.map((myposts) => {
            return (
              <div
                className="MyPostsList"
                key={myposts.id}
                onClick={() => {
                  navigate("/postdetail/" + myposts.id);
                }}
              >
                {myposts.thumnail === "false" ? (
                  <img
                    src={photo}
                    style={{ width: "97%" }}
                    className="MyPostImg"
                    alt="내게시글이미지"
                  />
                ) : (
                  <img
                    src={myposts.thumnail}
                    className="MyPostImg"
                    alt="내게시글이미지"
                  />
                )}
                <div className="AllMyPostList">
                  <div className="MyPostTitle">{myposts.title}</div>♥
                  {myposts.heartNum}
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
