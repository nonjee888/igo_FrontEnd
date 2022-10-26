import "./style.scss";
import { useNavigate } from "react-router-dom";
import photo from "../../asset/assetMypage/photo.png";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const id = post.id;
  const title = post.title;
  const thumnail = post.thumnail;
  const heart = post.heartNum;
  //   console.log(post.data.data);

  return (
    <>
      <div
        className="post-body"
        onClick={() => {
          navigate("/postdetail/" + id);
        }}
      >
        {thumnail === "false" ? (
          <img className="img-container" src={photo} loading="lazy" alt="" />
        ) : (
          <img className="img-container" src={thumnail} loading="lazy" alt="" />
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
