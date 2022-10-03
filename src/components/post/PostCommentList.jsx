import { useDispatch } from "react-redux";
import { removeComment } from "../../redux/modules/comments";

import profileImg from "../../asset/assetMypage/profileImg.png";
const CommentList = (props) => {
  const dispatch = useDispatch();
  const writerId = localStorage.getItem("nickname");
  const nickname = props.comment.nickname;
  const userConfirm = writerId === nickname;
  const content = props.comment.content;
  const postId = props.postId;
  const commentId = props.comment.id.toString();

  const payload = {
    postId,
    commentId,
  };

  return (
    <>
      <div className="ment-listWrapper">
        <div className="ment-wrapper">
          <div className="nickname">
            <img className="imgBox" src={profileImg} alt="" />

            {nickname}
          </div>
          <div className="comment">{content}</div>
          {userConfirm ? (
            <button
              className="delete-comment"
              onClick={() => {
                dispatch(removeComment(payload));
              }}
            >
              삭제
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CommentList;
