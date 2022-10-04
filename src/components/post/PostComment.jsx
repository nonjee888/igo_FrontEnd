import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";
import { createComment } from "../../redux/modules/comments";
import PostCommentList from "./PostCommentList";
import profileImg from "../../asset/assetMypage/profileImg.png";

const PostComment = () => {
  let dispatch = useDispatch();
  let username = localStorage.getItem("nickname");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialState = {
    postId: 0,
    content: "",
  };
  const [comments, setComments] = useState("");
  const [review, setReview] = useState(initialState);
  const { id } = useParams();
  let postId = id;
  const openModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  console.log(detail);
  const commentList = detail.commentResponseDtoList;
  const userProfile = detail.profile;

  return (
    <div
      style={{ height: modalOpen ? "500px" : "50px" }}
      className="commentContainer"
    >
      <p className="comment" onClick={openModal}>
        댓글보기
      </p>
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
              value={comments}
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
            {commentList?.map((comment) => {
              return (
                <PostCommentList
                  comment={comment}
                  key={comment.id}
                  postId={postId}
                  profile={detail.profile}
                  setComments={setComments}
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
