import "./style.scss";
import { useNavigate } from "react-router-dom";
import photo from "../../asset/assetMypage/photo.png";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const id = post.id;
  const title = post.title;
  const thumbnail = post.thumnail;
  const heart = post.heartNum;

  const getParametersForUnsplash = ({ width, height, quality, format }) => {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  };
  return (
    <>
      <div
        className="post-body"
        onClick={() => {
          navigate("/postdetail/" + id);
        }}
      >
        {thumbnail === "false" ? (
          <img className="img-container" src={photo} alt="" />
        ) : (
          <img
            className="img-container"
            src={
              thumbnail +
              getParametersForUnsplash({
                width: 191,
                height: 166,
                quality: 80,
                format: "WebP",
              })
            }
            alt=""
          />
        )}
        <div className="pic-wrapper">
          <div className="post-content">
            <div className="post-title">{title}</div>
            <div className="post-heart">♥{heart}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
