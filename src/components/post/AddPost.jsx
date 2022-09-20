import React, { useRef } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

const AddPost = () => {
  const editorRef = useRef();
  const handleRegisterButton = () => {
    console.log(editorRef.current?.getInstance().getHTML());
    console.log(editorRef.current?.getInstance().getMarkdown());
  };
  return (
    <div>
      <Editor
        ref={editorRef}
        placeholder="입력하세요"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        hideModeSwitch={true}
        plugins={[colorSyntax]}
        language="ko-KR"
      />
      <button onClick={handleRegisterButton}>완료</button>
    </div>
  );
};

export default AddPost;
