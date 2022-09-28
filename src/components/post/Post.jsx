//PostList에 보여질 카드
import React from "react";
import "./style.scss";
import emptyHeart from "../../asset/emptyHeart.png";

const Post = () => {
  return (
    <div className="pic-wrapper">
      <img
        className="img-container"
        src="https://img.hankyung.com/photo/202012/AKR20201202073200053_01_i_P4.jpg"
      />
      <button className="heart-btn" type="button">
        <img className="heart-btn-img" src={emptyHeart} alt="" />
      </button>
      <div className="post-content">title 들어갈곳</div>
    </div>
  );
};

export default Post;
