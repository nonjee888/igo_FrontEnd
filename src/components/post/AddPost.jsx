import React, { useEffect, useRef, useState } from "react";
import S3 from "react-aws-s3";
import submitpost from "../../asset/submitpost.png";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import PostSearchPlace from "./PostSearchPlace";

const AddPost = () => {
  const editorRef = useRef();
  // const isDesktop = true;
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const handleRegisterButton = () => {
    console.log(editorRef.current?.getInstance().getHTML());
    console.log(editorRef.current?.getInstance().getMarkdown());
  };
  //아
  return (
    <>
      <div className="allPost">
        <div className="addpost-title">
          <input className="input-title" placeholder="제목을 입력하세요" />
        </div>
        <div className="editor-wrapper">
          <Editor
            ref={editorRef}
            placeholder="입력하세요"
            initialValue=" "
            previewStyle="vertical"
            height="calc(100vh - 360px)"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            hideModeSwitch={true}
            plugins={[colorSyntax]}
            language="ko-KR"
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                const config = {
                  bucketName: "nondis3",
                  region: "ap-northeast-2",
                  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
                };
                const newName = new Date().toString().replace(/ /g, "");
                const replaced = newName.replace(
                  /[&\/\\#,+()$~%.'":*?<>{}]/g,
                  ""
                );
                const newFileName = "img" + replaced;
                const ReactS3Client = new S3(config);
                ReactS3Client.uploadFile(blob, newFileName)
                  .then((data) => callback(data.location, "image"))
                  .catch((err) => console.error(err));
              },
            }}
          />
          <div>
            <PostSearchPlace />
          </div>
          <div className="footer">
            <button className="submit-post" onClick={handleRegisterButton}>
              <img className="submit-icon" src={submitpost} alt="submit" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
