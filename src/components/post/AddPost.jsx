//에디터
import React, { useEffect, useRef, useState } from "react";
import S3 from "react-aws-s3";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import PostSearchPlace from "./PostSearchPlace";

const AddPost = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [inputCost, setInputCost] = useState("");
  const editor = editorRef.current?.getInstance().getHTML();

  const onChangeHandler = () => {};
  window.Buffer = window.Buffer || require("buffer").Buffer;

  let data = {
    title: title,
    inputCost: inputCost,
    editor: editor,
  };

  return (
    <>
      <div className="allPost">
        <div className="addpost-title">
          <input
            className="input-title"
            placeholder="제목을 입력하세요"
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>태그를 선택하세요</div>
        <div className="editor-wrapper">
          <Editor
            ref={editorRef}
            placeholder="입력하세요"
            initialValue=" "
            previewStyle="vertical"
            height="calc(100vh - 390px)"
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
          <div className="cost-wrap">
            <input
              className="cost-input"
              placeholder="여행경비를 입력해주세요."
              onChange={(event) => setInputCost(event.target.value)}
              type="text"
              value={inputCost}
            />
            <div>단위: 원</div>
          </div>

          <div>
            <PostSearchPlace data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
