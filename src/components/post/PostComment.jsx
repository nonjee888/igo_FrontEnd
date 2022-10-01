import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/modules/comments";
import PostCommentList from "./PostCommentList";

const PostComment = () => {
  let dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialState = {
    id_post: 0,
    content: "",
  };
  const [comments, setComments] = useState("");
  const [review, setReview] = useState(initialState);
  const { id } = useParams();
  // let id_post = id;
  const openModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  // useEffect(() => {
  //   async(() => {
  //       setLoading(true);
  //       const data = await axios(코멘트 get)
  //       if (data.status === 'success') {
  //           setComments(data.data);
  //           setLoading(false);
  //       }
  //   })();
  // }, []);

  return (
    <div
      style={{ height: modalOpen ? "500px" : "50px" }}
      className="commentContainer"
    >
      <p onClick={openModal}>댓글</p>
      {!loading && modalOpen && (
        <>
          <div className="toggle-comment-wrapper">
            <div className="nickname-wrap">닉네임</div>
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
                  id_post: Number(id),
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
            <PostCommentList />
          </div>
        </>
      )}
    </div>
  );
};

export default PostComment;
