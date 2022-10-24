import { useDispatch } from "react-redux";
import { removeComment } from "../../redux/modules/comments";
import Swal from "sweetalert2";
//이미지
import deleteimg from "../../asset/deleteimg.png";
import deleteNemo from "../../asset/deleteNemo.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import commentIcon from "../../asset/commentIcon.png";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const myinfo = props?.myinfo;
  const myName = props?.myinfo && myinfo[0]?.nickname;
  const writerId = props.comment.nickname;
  const commentProfile = props.comment.profile;
  const userConfirm = writerId === myName;
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
            <div className="userNick" style={{ fontSize: "10px" }}>
              {writerId}
            </div>
          </div>
          <div className="comment">{content}</div>
          {userConfirm ? (
            <button
              className="delete-btn"
              onClick={() => {
                Swal.fire({
                  showCancelButton: true,
                  imageUrl: commentIcon,
                  imageWidth: 50,
                  imageHeight: 40,
                  text: "댓글을 삭제할까요?",
                  confirmButtonColor: "#47AFDB",
                  cancelButtonColor: "#D9D9D9",
                  confirmButtonText: "확인",
                  cancelButtonText: "취소",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(removeComment(payload));
                  }
                });
              }}
            >
              <img className="delete-icon" src={deleteimg} />
            </button>
          ) : (
            <button className="delete-btn">
              <img className="delete-icon1" src={deleteNemo} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentList;
