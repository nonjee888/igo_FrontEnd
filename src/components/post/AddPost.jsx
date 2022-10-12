//에디터
import Swal from "sweetalert2";
import S3 from "react-aws-s3";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";

import PostSearchPlace from "./PostSearchPlace";
import InterestModal from "../postmodal/InterestModal";
import CostModal from "../postmodal/CostModal";
import RegionModal from "../postmodal/RegionModal";

const AddPost = () => {
  const inputFocus = useRef(null);
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state?.posts);
  const { id } = useParams();
  const writerId = detail.nickname;
  const isEdit = id !== undefined;
  const NICKNAME = localStorage.getItem("nickname");

  window.Buffer = window.Buffer || require("buffer").Buffer;
  const editorRef = useRef();

  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");
  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  });
  const [isActive, setIsActive] = useState(false);
  const content = editor;

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleEditor = (e) => {
    const innerText = editorRef.current?.getInstance().getHTML();
    setEditor(innerText);
  };
  const isSubmitPost = () => {
    if (content !== "<p><br></p>" && title !== "") {
      if (content.length > 10 && title.length >= 2) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };

  const [checkedItems, setCheckedItems] = useState({
    interest: "",
    region: "",
    cost: "",
  });
  const tags = Object.values(checkedItems);
  const [regionChecked, setRegionChecked] = useState(false);
  const [interestChecked, setInterestChecked] = useState(false);
  const [costChecked, setCostChecked] = useState(false);
  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [openInterestModal, setOpenInterestModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);

  const openInterestNextModal = () => {
    setOpenInterestModal(false);
    setOpenRegionModal(true);
  };
  const openRegionNextModal = () => {
    setOpenRegionModal(false);
    setOpenCostModal(true);
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getDetailPosts(id)).then((response) => {
        setTitle(response.payload.title);
        setEditor(
          editorRef.current?.getInstance().setHTML(response.payload.content)
        );
        setOverlayData(response.payload.mapData);
        setCheckedItems({
          interest: response.payload.tags[0],
          region: response.payload.tags[1],
          cost: response.payload.tags[2],
        });
      });
    } else {
      setTitle("");
      setEditor(editorRef.current?.getInstance().getHTML());
    }
  }, [id]);

  let data = {
    title: title,
    editor: editor,
    tags: tags,
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

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
              onChange={handleTitle}
              onKeyUp={isSubmitPost}
              ref={inputFocus}
            />
          </div>
          <div className="tagsbox">
            <button
              className="tagmodalbtn"
              onClick={() => {
                setOpenInterestModal(true);
              }}
            >
              {interestChecked ? checkedItems.interest : "관심사"}
            </button>
            {openInterestModal && (
              <InterestModal
                interestChecked={interestChecked}
                setInterestChecked={setInterestChecked}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                closeInterestModal={setOpenInterestModal}
                openInterestNextModal={openInterestNextModal}
              />
            )}
            <button
              className="tagmodalbtn"
              onClick={() => {
                setOpenRegionModal(true);
                setOpenInterestModal(false);
                setOpenCostModal(false);
              }}
            >
              {regionChecked ? checkedItems.region : "지역"}
            </button>

            {openRegionModal && (
              <RegionModal
                regionChecked={regionChecked}
                setRegionChecked={setRegionChecked}
                closeModal={setOpenRegionModal}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                openRegionNextModal={openRegionNextModal}
              />
            )}
            <button
              className="tagmodalbtn"
              onClick={() => {
                setOpenCostModal(true);
                setOpenRegionModal(false);
                setOpenInterestModal(false);
              }}
            >
              {costChecked ? checkedItems.cost : "여행경비"}
            </button>
            {openCostModal && (
              <CostModal
                costChecked={costChecked}
                setCostChecked={setCostChecked}
                closeModal={setOpenCostModal}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            )}
          </div>
          <div className="editor-wrapper">
            <Editor
              ref={editorRef}
              placeholder="내용을 입력 할 때 ... 을 누르면 사진을 공유 할 수 있어요!"
              initialValue=""
              previewStyle="vertical"
              height="calc(95vh - 390px)"
              initialEditType="wysiwyg"
              useCommandShortcut={false}
              onChange={handleEditor}
              onKeyup={isSubmitPost}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              language="ko-KR"
              name="editor"
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
                isActive={isActive}
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
