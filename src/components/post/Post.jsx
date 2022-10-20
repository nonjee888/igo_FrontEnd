//PostList에 보여질 카드
import "./style.scss";
import { useNavigate } from "react-router-dom";
import photo from "../../asset/assetMypage/photo.png";

const Post = (props) => {
  const navigate = useNavigate();
  const id = props.post.id;
  const title = props.post.title;
  const thumnail = props.post.thumnail;
  const heart = props.post.heartNum;

  return (
    <>
      <div className="post-wrapper">
        <div
          className="post-body"
          onClick={() => {
            navigate("/postdetail/" + id);
          }}
        >
          {thumnail === "false" ? (
            <img className="img-container" src={photo} />
          ) : (
            <img className="img-container" src={thumnail} />
          )}
          <div className="pic-wrapper">
            <div className="post-content">
              <div className="post-title">{title}</div>
              <div className="post-heart">♥{heart}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
