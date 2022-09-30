import "./style.scss";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { onLikePost } from "../../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";
import PostComment from "./PostComment";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import editpost from "../../asset/editpost.png";
import deleteimg from "../../asset/deleteimg.png";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  console.log(detail);
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
  const onLike = async (event) => {
    event.preventDefault();
    dispatch(onLikePost(id));
    window.location.reload();
  };

  return (
    <>
      <div className="All">
        <div className="detail-wrapper">
          <div className="detail-title">
            <h4 className="title">{detail?.title}</h4>
          </div>
          <div className="detail-btns">
            <div>
              <img />
              조회수:{detail?.viewCount}
            </div>
            <div>
              <img />
              <button onClick={onLike} className="liked-post-btn">
                💙
              </button>
              {detail?.heartNum}
            </div>
            <button className="edit-btn">
              <img src={edit} className="edit-icon" />
            </button>
            <button className="delete-btn">
              <img src={deleteimg} className="delete-icon" />
            </button>
          </div>
          <div className="tag-wrapper">태그들어감</div>

          <div
            className="html-wrapper"
            dangerouslySetInnerHTML={{ __html: detail?.content }}
          ></div>
          <div className="map-wrapper">지도보일곳</div>
        </div>
        <PostComment />
      </div>
    </>
  );
};

export default PostDetail;
