import { useEffect, useState } from "react";
import PostCommentList from "./PostCommentList";

const PostComment = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const openModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  useEffect(() => {
    // async(() => {
    //     setLoading(true);
    //     const data = await axios(코멘트 get)
    //     if (data.status === 'success') {
    //         setComments(data.data);
    //         setLoading(false);
    //     }
    // })();
  }, []);
  console.log(modalOpen);
  return (
    <div
      style={{ height: modalOpen ? "500px" : "50px" }}
      className="commentContainer"
    >
      <p onClick={openModal}>댓글 작성하기</p>
      {!loading && modalOpen && (
        <>
          <div className="toggle-comment-wrapper">
            <div className="nickname-wrap">닉네임</div>
            <input className="comment-input" placeholder="댓글추가..."></input>
            <button className="add-btn">댓글</button>
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
