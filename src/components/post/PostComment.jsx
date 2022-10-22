import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../../redux/modules/comments";
import PostCommentList from "./PostCommentList";
import commentIcon from "../../asset/commentIcon.png";
import profileImg from "../../asset/assetMypage/profileImg.png";
import pleaseLogin from "../../asset/pleaseLogin.png";

const PostComment = () => {
  let dispatch = useDispatch();

  const { myinfo } = useSelector((state) => state.myinfo);
  const { comments, error } = useSelector((state) => state.comments);
  const user = myinfo && myinfo[0]?.nickname;
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
  const payload = {
    review,
  };
  useEffect(() => {
    dispatch(getComments(id)).then((res) => {
      if (!res) {
        setLoading(true);
      }
    });
  }, [dispatch, id]);

  if (error) {
    return (
      <div className="All" style={{ marginLeft: "10%" }}>
        <img
          style={{ width: "100%", height: "100%", marginBottom: "10%" }}
          src={pleaseLogin}
        />
        죄송합니다 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div
      style={{ height: modalOpen ? "50%" : "8%" }}
      className="commentContainer"
    >
      <div className="comment-tap" onClick={openModal}>
        <img className="icon-comment" src={commentIcon} />
      </div>
      {!loading && modalOpen && (
        <>
          {!user ? (
            <div className="toggle-comment-wrapper">
              <div className="nickname">
                {myinfo === undefined ? (
                  <img className="profileImg" src={profileImg} alt="" />
                ) : (
                  <img
                    className="profileImg"
                    src={myinfo && myinfo[0]?.profileImage}
                    alt=""
                  />
                )}
                <div className="userNick">
                  {myinfo && myinfo[0].nickname}비회원
                </div>
              </div>
              로그인 후 댓글을 남겨 보세요!
            </div>
          ) : (
            <div className="toggle-comment-wrapper">
              <div className="nickname">
                {(myinfo && myinfo[0]?.profileImage === null) || undefined ? (
                  <img className="profileImg" src={profileImg} alt="" />
                ) : (
                  <img
                    className="profileImg"
                    src={myinfo && myinfo[0]?.profileImage}
                    alt=""
                  />
                )}
                <div className="userNick">{myinfo && myinfo[0].nickname}</div>
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
                작성
              </button>
            </div>
          )}
          <div className="commentList">
            {comments &&
              comments?.map((comment) => {
                return (
                  <PostCommentList
                    myinfo={myinfo}
                    comment={comment}
                    key={comment?.id}
                    postId={postId}
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
