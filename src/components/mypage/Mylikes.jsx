import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";
import { getMylikes } from "../../redux/modules/mylikes";
import photo from "../../asset/assetMypage/photo.png";

const Mylikes = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const mylikes = useSelector((state) => state.mylikes.mylike);
  console.log(mylikes);

  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getMylikes());
  }, [dispatch]);

  return (
    <div className="All">
      <div className="MyPosts">
        <h3>나의 🤍 게시글</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {mylikes?.map((mylikes) => {
            return (
              <div
                className="MyPostsList"
                key={mylikes.id}
                onClick={() => {
                  navigate("/postdetail/" + mylikes.id);
                }}
              >
                {mylikes.thumnail === "false" ? (
                  <img
                    src={photo}
                    style={{ width: "97%" }}
                    className="MyPostImg"
                    alt="내게시글이미지"
                  />
                ) : (
                  <img
                    src={mylikes.thumnail}
                    className="MyPostImg"
                    alt="내게시글이미지"
                  />
                )}

                <div className="MyPostTitle">{mylikes.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mylikes;
