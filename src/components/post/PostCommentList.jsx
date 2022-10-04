import { useDispatch } from "react-redux";
import { instance } from "../../shared/api";
import { removeComment } from "../../redux/modules/comments";
import deleteimg from "../../asset/deleteimg.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import { useNavigate } from "react-router-dom";
const CommentList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const writerId = localStorage.getItem("nickname");
  const nickname = props.comment.nickname;
  const userConfirm = writerId === nickname;
  const content = props.comment.content;
  const commentList = props.commentList;
  const postId = props.postId;
  const userProfile = props.profile;
  const id = postId;
  const commentId = props.comment.id.toString();

  const payload = {
    postId,
    commentId,
  };

  const removeComment = async (event) => {
    event.preventDefault();
    const { data } = await instance.delete(
      `/api/comments/${payload.commentId}`,
      {
        postId: payload.postId,
      }
    );
    console.log(data);
    if (data.success) {
      window.alert("삭제되었습니다.");
      window.location.reload();
    }
    // if (data.success) {
    //   const index = commentList.findIndex(
    //     (comment) => comment.id === Number(payload.commentId)
    //   );
    //   console.log(index);
    //   console.log(commentList);
    //   return commentList.splice(index, 1);
    // }
  };

  return (
    <>
      <div className="ment-listWrapper">
        <div className="ment-wrapper">
          <div className="nickname">
            {userProfile === null ? (
              <img className="profileImg" src={profileImg} alt="" />
            ) : (
              <img className="profileImg" src={userProfile} alt="" />
            )}
            <p className="userNick">{nickname}</p>
          </div>
          <div className="comment">{content}</div>
          {userConfirm ? (
            <button className="delete-btn" onClick={removeComment}>
              <img className="delete-icon" src={deleteimg} />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CommentList;
