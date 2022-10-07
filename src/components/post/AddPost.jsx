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

import InterestModal from "../postmodal/InterestModal";
import CostModal from "../postmodal/CostModal";
import RegionModal from "../postmodal/RegionModal";

const AddPost = ({ props }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state?.posts);
  const writerId = detail.nickname;
  const NICKNAME = localStorage.getItem("nickname");
  const overlayData = props.overlayData;
  const setOverlayData = props.setOverlayData;
  window.Buffer = window.Buffer || require("buffer").Buffer;

  const { id } = useParams();
  const isEdit = id !== undefined;
  const editorRef = useRef();

  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    interest: "",
    region: "",
    cost: "",
  });
  const tags = Object.values(checkedItems);

  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [openInterestModal, setOpenInterestModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getDetailPosts(id)).then((response) => {
        setTitle(response.payload.title);
        setEditor(
          editorRef.current?.getInstance().setHTML(response.payload.content)
        );
        setOverlayData(response.payload.mapData);
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
          <div className="tagsbox">
            <button
              onClick={() => {
                setOpenInterestModal(true);
              }}
            >
              관심사
            </button>
            {openInterestModal && (
              <InterestModal
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                closeInterestModal={setOpenInterestModal}
              />
            )}
            <button
              onClick={() => {
                setOpenRegionModal(true);
              }}
            >
              지역
            </button>
            {openRegionModal && (
              <RegionModal
                closeModal={setOpenRegionModal}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            )}
            <button
              onClick={() => {
                setOpenCostModal(true);
              }}
            >
              여행경비
            </button>
            {openCostModal && (
              <CostModal
                closeModal={setOpenCostModal}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            )}
          </div>
          <div className="editor-wrapper">
            <Editor
              ref={editorRef}
              placeholder="
            ❤내돈내여 여행공유 작성 tip ❤                                                      
              ❤ 태그는 3개 선택 할 수 있어요!                                                      
              ❤ …을 누르면 사진을 업로드 할 수 있어요!                                      
              ❤ 사진 크기는 428*300px 에 최적화 되어있습니다.                          
              ❤ 지도 하단 여행경로 버튼을 누르면 여행 경로를 그릴 수 있어요!           
              ❤ 출발지 | 도착지 버튼으로 출발지와 도착지를 표시 해 보세요!           
              ❤ 경로업데이트 | 여행경로수정 버튼으로 경로를 지도에 저장해주세요!   
              ❤ 게시물작성 또는 게시물수정 버튼을 누르면 공유 완료!
              "
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
