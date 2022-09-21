import React from "react";
import heart from "../../asset/heart.png";

const Mylikes = () => {
  return (
    <div className="All">
      <div className="MyPosts">
        <h3>나의 🤍 게시글</h3>
        <div className="MyPostsList">
          <img src="" className="MyPostImg" alt="내게시글이미지" />
          <div className="MyPostTitle">
            제목
            <img src={heart} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mylikes;
