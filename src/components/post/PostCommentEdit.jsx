import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/modules/comments";

const CommentEdit = ({ close }) => {
  let dispatch = useDispatch();
  const initialsState = {
    //   postId:
    //   content:
  };
  const [ment1, setMent] = useState(initialsState);
  const [content, setContent] = useState(ment1.content);
  const payload = {};
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
