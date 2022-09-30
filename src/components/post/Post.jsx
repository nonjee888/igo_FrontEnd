//PostList에 보여질 카드
import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import emptyHeart from "../../asset/emptyHeart.png";

const Post = (props) => {
  let navigate = useNavigate();
  let id = props.post.id;
  let title = props.post.title;
  let content = props.post.content;
  let name = props.post.member.nickname;
  let heart = props.post.heartNum;

  // let urlRegex = /<img[^>]+src=[\"']?([^>\"']+)[\"']?[^>]*>/g;
  // let url = content.match(0);
  // console.log(url);

  // let urlRegex = /(https?:\/\/[^>\"']*)/;
  // let url = content.match(urlRegex);
  // console.log(url[1]);

  return (
    <>
      <div
        className="post-body"
        onClick={() => {
          navigate("/postdetail/" + id);
        }}
      >
        <div className="pic-wrapper">
          <img
            className="img-container"
            src="https://img.hankyung.com/photo/202012/AKR20201202073200053_01_i_P4.jpg"
          />
          <div className="post-content">
            <p>{title}</p> <p>{name}</p>
            <p>{heart}</p>
          </div>
          <button className="heart-btn" type="button">
            <img className="heart-btn-img" src={emptyHeart} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
