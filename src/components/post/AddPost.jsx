//에디터
import S3 from "react-aws-s3";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import Swal from "sweetalert2";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";

import PostSearchPlace from "./PostSearchPlace";

const AddPost = ({ props }) => {
  // console.log(props);
  const dispatch = useDispatch();
  const NICKNAME = localStorage.getItem("nickname");
  const overlayData = props.overlayData;
  const setOverlayData = props.setOverlayData;

  const { id } = useParams();
  const isEdit = id !== undefined;
  const editorRef = useRef();

  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");

  const { detail } = useSelector((state) => state?.posts);
  const writerId = detail.nickname;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getDetailPosts(id)).then((response) => {
        setTitle(response.payload.title);
        setEditor(
          editorRef.current?.getInstance().setHTML(response.payload.content)
        );
        // setOverlayData(response.payload.mapData);
      });
    } else {
      setTitle("");
      setEditor(editorRef.current?.getInstance().getHTML());
    }
  }, [dispatch]);

  window.Buffer = window.Buffer || require("buffer").Buffer;

  let data = {
    title: title,
    editor: editor,
  };

  return (
    <>
      {NICKNAME ? (
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
              placeholder="사진 크기는 400*300px 에 최적화 되어있습니다."
              initialValue=" "
              previewStyle="vertical"
              height="calc(100vh - 390px)"
              initialEditType="wysiwyg"
              useCommandShortcut={false}
              onChange={() => {
                const innerText = editorRef.current?.getInstance().getHTML();
                setEditor(innerText);
              }}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              language="ko-KR"
              name="editor"
              required
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
              <PostSearchPlace
                id={id}
                data={data}
                writerId={writerId}
                isEdit={isEdit}
                overlayData={overlayData}
                setOverlayData={setOverlayData}
              />
            </div>
          </div>
        </div>
      ) : (
        Swal.fire({
          icon: "error",
          text: "로그인을 하셔야 이용 가능합니다.",
          showCancelButton: true,
          confirmButtonColor: "#47AFDB",
          cancelButtonColor: "#D9D9D9",
          confirmButtonText: "로그인하러가기",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/");
          }
        })
      )}
    </>
  );
};

export default AddPost;
