import "./style.scss";
import { useNavigate } from "react-router-dom";
import photo from "../../asset/assetMypage/photo.png";
import filledHeart from "../../asset/filledHeart.png";

const RecommendPost = ({ item }) => {
  const navigate = useNavigate();

  // html에서 정규표현식으로 썸네일 추출
  const urlRegex = /(https?:\/\/[^>\"']*)/;
  const url = item.content.match(urlRegex);

  return (
    <>
      <div
        className="post-body"
        onClick={() => {
          navigate("/postdetail/" + item.id);
        }}
      >
        {url === null ? (
          <img className="img-container" src={photo} />
        ) : (
          <img className="img-container" src={url[1]} />
        )}
        <div className="pic-wrapper">
          <div className="post-content">
            <p>{item.title}</p>
            <p>{item.member.nickname}</p>
            <img className="heart-btn-img" src={filledHeart} alt="" />
            {item.heartNum}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendPost;
