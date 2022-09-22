import "./style.scss";
import React, { useRef } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

const PostEdit = () => {
  const editorRef = useRef();
  const handleRegisterButton = () => {
    console.log(editorRef.current?.getInstance().getHTML());
    console.log(editorRef.current?.getInstance().getMarkdown());
  };
  return (
    <>
      <div className="detail-wrapper">
        <div className="editor-wrapper">
          <Editor
            ref={editorRef}
            placeholder="입력하세요"
            initialValue=" "
            previewStyle="vertical"
            height="700px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            hideModeSwitch={true}
            plugins={[colorSyntax]}
            language="ko-KR"
          />
        </div>
        <div className="detail-btns">
          <button className="edit-btn">수정</button>
          <button className="delete-btn">삭제</button>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
