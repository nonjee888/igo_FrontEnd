import React from "react";
import emptyHeart from "../../asset/emptyHeart.png";

const Post = () => {
  return (
    <div>
      <div className="pic-wrapper">
        <img
          className="img-container"
          src="https://img.hankyung.com/photo/202012/AKR20201202073200053_01_i_P4.jpg"
        />
        <img className="icon-heart" src={emptyHeart} />
        <p className="post-content">body내용</p>
      </div>
    </div>
  );
};

export default Post;
