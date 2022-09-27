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
  const [title, setTitle] = useState();
  const [tag, setTag] = useState();
  const [tagList, setTagList] = useState([]);
  const [inputCost, setInputCost] = useState();
  const [mapData, setMapData] = useState({
    marker: [],
    polyline: [],
  });
  const editor = editorRef.current?.getInstance().getHTML();
  window.Buffer = window.Buffer || require("buffer").Buffer;

  // const handleRegisterButton = async (event) => {
  //   event.preventDefault();
  //   let data = {
  //     title: title,
  //     // tagList: tagList,
  //     inputCost: inputCost,
  //     editor: editorRef.current?.getInstance().getHTML(),
  //   };
  //   console.log(editorRef.current?.getInstance().getHTML());
  // };

  const onChange = (event, setState) => setState(event.target.value);

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
            onChange={(event) => onChange(event, setTitle)}
            required
          />
        </div>
        <div>태그를 선택하세요</div>
        <div className="editor-wrapper">
          <Editor
            ref={editorRef}
            // value={editor}
            // onChange={(event) => onChange(event, setEditor)}
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
              onChange={(event) => onChange(event, setInputCost)}
              type="text"
              value={inputCost}
            />
            <div>단위: 원</div>
          </div>

          <div>
            <PostSearchPlace
              // handleRegisterButton={handleRegisterButton}
              title={title}
              inputCost={inputCost}
              setMapData={setMapData}
              editor={editor}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
