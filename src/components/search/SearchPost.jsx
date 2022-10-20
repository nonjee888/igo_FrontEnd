//PostList에 보여질 카드
import "./style.scss";
import { useNavigate } from "react-router-dom";

import photo from "../../asset/assetMypage/photo.png";
import filledHeart from "../../asset/filledHeart.png";

const SearchPost = (props) => {
  const navigate = useNavigate();
  const title = props.post.title;
  const id = props.post.id;
  const content = props.post.content;
  const heartNum = props.post.heartNum;
  const nickname = props.post.nickname;
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
            <p>{title}</p> <p>{nickname}</p>
            <img className="heart-btn-img" src={filledHeart} alt="" />
            {heartNum}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPost;
