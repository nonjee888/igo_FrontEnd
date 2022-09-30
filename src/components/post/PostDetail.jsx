import "./style.scss";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Viewer } from "@toast-ui/react-editor";
import { getDetailPosts } from "../../redux/modules/posts";
import PostComment from "./PostComment";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import editpost from "../../asset/editpost.png";
import deleteimg from "../../asset/deleteimg.png";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { isLoading, error, detail } = useSelector((state) => state?.posts);

  let { id } = useParams();
  useEffect(() => {
    dispatch(getDetailPosts(id));
  }, [dispatch]);
  if (isLoading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  // var newText = content.replace(/<[^>]*>?/g, ''); //태그 제거
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
