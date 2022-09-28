import React, { useState } from "react";
import PostCommentEdit from "./PostCommentEdit";

const CommentList = () => {
  let [modal, setModal] = useState(false); //modal창은 false로 보이지 않는 상태
  const close = () => {
    setModal(false);
  };
  return (
    <>
      {modal ? <PostCommentEdit close={close} /> : null}
      <div className="ment-listWrapper">
        <div className="ment-wrapper">
          <div className="nickname">닉네임</div>
          <div className="comment">댓글 솰라솰라</div>
          {/* 로그인시 자기 댓글 누르면 수정 삭제 버튼 나오게하기 */}
          <button
            onClick={() => {
              setModal(true); //수정 누르면 모달창 띄워짐
            }}
          >
            수정
          </button>
          <button>삭제</button>
        </div>
      </div>
    </>
  );
};

export default CommentList;
