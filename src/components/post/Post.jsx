//PostList에 보여질 카드
import "./style.scss";
import { useNavigate } from "react-router-dom";
import photo from "../../asset/assetMypage/photo.png";
import filledHeart from "../../asset/filledHeart.png";

const Post = (props) => {
  const navigate = useNavigate();
  const id = props.post.id;
  const title = props.post.title;
  const content = props.post.content;
  const name = props?.post?.member?.nickname;
  const heart = props.post.heartNum;

  // html에서 정규표현식으로 썸네일 추출
  const urlRegex = /(https?:\/\/[^>\"']*)/;
  const url = content.match(urlRegex);

  return (
    <>
      <div
        className="post-body"
        onClick={() => {
          navigate("/postdetail/" + id);
        }}
      >
        {url === null ? (
          <img className="img-container" src={photo} />
        ) : (
          <img className="img-container" src={url[1]} />
        )}
        <div className="pic-wrapper">
          <div className="post-content">
            <div className="post-title">{title}</div>
            <p className="post-nick">{name}</p>
            <img className="heart-btn-img" src={filledHeart} alt="" />
            {heart}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
