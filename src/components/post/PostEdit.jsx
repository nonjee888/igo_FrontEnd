import "./style.scss";
import React from "react";

const PostEdit = () => {
  return (
    <>
      <div className="detail-wrapper">
        <div className="title-wrapper">
          <h2 className="title">Edit Title</h2>
        </div>
        <div className="content-wrapper">
          <div className="pic-wrapper">
            <img className="img-container" src=""></img>
            <img className="icon-heart" src="" />
          </div>
          <div className="map-wrapper">지도</div>
          <div className="body-wrapper">body</div>
          <div className="price">
            <div className="total-price-label">총금액</div>
            <input className="total-cost" />
          </div>

          <div className="detail-btns">
            <button className="edit-btn">수정</button>
            <button className="delete-btn">삭제</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
