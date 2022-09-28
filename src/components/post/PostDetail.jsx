import "./style.scss";
import React from "react";
import PostComment from "./PostComment";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import deleteimg from "../../asset/deleteimg.png";

const PostDetail = () => {
  return (
    <>
      <div className="All">
        <div className="detail-wrapper">
          <div className="detail-title">
            <h4 className="title">제목</h4>
          </div>
          <div className="detail-btns">
            <div>
              <img />
              10
            </div>
            <div>
              <img />
              10
            </div>
            <button className="edit-btn">
              <img src={edit} className="edit-icon" />
            </button>
            <button className="delete-btn">
              <img src={deleteimg} className="delete-icon" />
            </button>
          </div>
          <div className="tag-wrapper">태그들어감</div>
          <div className="detail-content">에디터내용</div>
          <div className="map-wrapper">지도보일곳</div>
        </div>
        <PostComment />
      </div>
    </>
  );
};

export default PostDetail;
