import { useDispatch } from "react-redux";
import { removeComment } from "../../redux/modules/comments";
import deleteimg from "../../asset/deleteimg.png";
import deleteNemo from "../../asset/deleteNemo.png";
import profileImg from "../../asset/assetMypage/profileImg.png";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const writerId = localStorage.getItem("nickname");
  const nickname = props.comment.nickname;
  const commentProfile = props.comment.profile;
  const userConfirm = writerId === nickname;
  const content = props.comment.content;
  const postId = props.postId;
  const commentId = props.comment.id;

  const payload = {
    postId,
    commentId,
  };

  return (
    <>
      <div className="ment-listWrapper">
        <div className="ment-wrapper">
          <div className="nickname">
            {commentProfile === null ? (
              <img className="profileImg" src={profileImg} alt="" />
            ) : (
              <img className="profileImg" src={commentProfile} alt="" />
            )}
            <p className="userNick">{nickname}</p>
          </div>
          <div className="comment">{content}</div>
          {userConfirm ? (
            <button
              className="delete-btn"
              onClick={() => {
                dispatch(removeComment(payload));
              }}
            >
              <img className="delete-icon" src={deleteimg} />
            </button>
          ) : (
            <button className="delete-btn">
              <img className="delete-icon" src={deleteNemo} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentList;
