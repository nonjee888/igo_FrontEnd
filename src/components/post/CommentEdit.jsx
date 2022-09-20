import React, { useState } from "react";

const CommentEdit = ({ close }) => {
  const initialsState = {};
  const [ment1, setMent] = useState(initialsState);
  const [content, setContent] = useState(ment1.content);
  return (
    <>
      <div className="show-modal">
        <h4 className="modal-text">댓글수정</h4>
        <div className="edit-content">
          <input
            className="edit-input"
            type="text"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            className="btn-editModal"
            onClick={() => {
              //dispatch 수정하기 넣어주기
              close();
            }}
          >
            수정
          </button>
          <button
            className="btn-editModal"
            onClick={() => {
              close();
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentEdit;
