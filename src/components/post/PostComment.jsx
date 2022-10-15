import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../../redux/modules/comments";
import PostCommentList from "./PostCommentList";
import commentIcon from "../../asset/commentIcon.png";
import profileImg from "../../asset/assetMypage/profileImg.png";

const PostComment = () => {
  let dispatch = useDispatch();
  let username = localStorage.getItem("nickname");
  const { detail } = useSelector((state) => state.posts);
  const { isLoading, error, comments } = useSelector((state) => state.comments);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialState = {
    postId: 0,
    content: "",
  };

  const [comment, setComments] = useState("");
  const [review, setReview] = useState(initialState);
  const { id } = useParams();
  let postId = id;
  const openModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);
  if (isLoading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const userProfile = detail.profile;

  return (
    <div
      style={{ height: modalOpen ? "50%" : "6%" }}
      className="commentContainer"
    >
      <div className="comment-tap" onClick={openModal}>
        <img className="icon-comment" src={commentIcon} />
      </div>
      {!loading && modalOpen && (
        <>
          <div className="toggle-comment-wrapper">
            <div className="nickname">
              {userProfile === null ? (
                <img className="profileImg" src={profileImg} alt="" />
              ) : (
                <img className="profileImg" src={userProfile} alt="" />
              )}
              <p className="userNick">{username}</p>
            </div>
            <input
              type="text"
              name="comments"
              value={comment}
              className="comment-input"
              placeholder="댓글입력..."
              onChange={(e) => {
                setComments(e.target.value);
                setReview({
                  ...review,
                  postId: id,
                  content: e.target.value,
                });
              }}
            />
            <button
              className="add-btn"
              onClick={() => {
                dispatch(createComment(review));
                setReview(initialState);
                setComments("");
              }}
            >
              댓글
            </button>
          </div>
          <div className="commentList">
            {comments?.map((comment) => {
              return (
                <PostCommentList
                  comment={comment}
                  key={comment.id}
                  postId={postId}
                  profile={detail.profile}
                  setComments={setComments}
                  commentList={comments}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PostComment;
