//PostList에 보여질 카드
import "./style.scss";
import { useNavigate } from "react-router-dom";
import photo from "../../asset/assetMypage/photo.png";
import emptyHeart from "../../asset/emptyHeart.png";

const Post = (props) => {
  let navigate = useNavigate();
  let id = props.post.id;
  let title = props.post.title;
  let content = props.post.content;
  let name = props.post.member.nickname;
  let heart = props.post.heartNum;

  // html에서 정규표현식으로 썸네일 추출
  let urlRegex = /(https?:\/\/[^>\"']*)/;
  let url = content.match(urlRegex);

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
            <p>{title}</p> <p>{name}</p>
            <div>
              <img className="heart-btn-img" src={emptyHeart} alt="" />
              {heart}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
