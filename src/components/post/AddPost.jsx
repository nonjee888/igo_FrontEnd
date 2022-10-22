//Toast UI 에디터
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

import pleaseLogin from "../../asset/pleaseLogin.png";

const AddPost = () => {
  //Buffer: 브라우저에서 바이너리 데이터 조작하기 위함
  window.Buffer = window.Buffer || require("buffer").Buffer;

  //제목, 내용, 지도, 버튼활성화 state
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");
  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  });
  const [isActive, setIsActive] = useState(false);

  const content = editor;
  const editorRef = useRef();
  const dispatch = useDispatch();
  const inputFocus = useRef(null);
  const { detail, isLoading, error } = useSelector((state) => state?.posts);
  const { id } = useParams();

  //isEdit 게시물의 id가 param에 존재할 때
  const isEdit = id !== undefined;
  const writerId = detail.nickname;
  const NICKNAME = localStorage.getItem("nickname");

  //게시글Add changehandler
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleEditor = (e) => {
    const innerText = editorRef.current?.getInstance().getHTML();
    setEditor(innerText);
  };

  //게시글등록 버튼: 제목, 내용이 각각 2, 9자리 글자 이하면 버튼 비활성화
  const isSubmitPost = () => {
    if (content !== "<p><br></p>" && title !== "") {
      if (content.length > 9 && title.length >= 2) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  };

  //게시글 Edit모드일때, 각 state에 게시물 상세조회 response에서 받은 데이터 저장
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
      //Edit모드가 아니라면 state초기화
    } else {
      setTitle("");
      setEditor(editorRef.current?.getInstance().getHTML());
    }
  }, [id]); //게시글의 id가 다를때마다 useEffect가 실행 됨

  //태그 선택 state
  const [checkedItems, setCheckedItems] = useState({
    interest: "관심사선택",
    region: "지역 선택",
    cost: "비용 선택",
  });

  //Object를 List의 형태로 변환
  const tags = Object.values(checkedItems);

  const [isChecked, setIsChecked] = useState(false);
  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [openInterestModal, setOpenInterestModal] = useState(false);
  const [openCostModal, setOpenCostModal] = useState(false);

  let data = {
    title: title,
    editor: editor,
    tags: tags,
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  if (error) {
    return (
      <div className="All" style={{ marginLeft: "10%" }}>
        <img
          style={{ width: "100%", height: "100%", marginBottom: "10%" }}
          src={pleaseLogin}
        />
        죄송합니다 다시 시도해주세요.
      </div>
    );
  }
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
              onKeyUp={isSubmitPost} //입력한 글자수 표시하기 위한 keyup이벤트
              ref={inputFocus}
            />
          </div>
          <div className="tagsbox">
            <button
              className={
                checkedItems.interest === "관심사선택" //initialState 일 때 === 아무것도 선택되지 않았을 때, 태그 색깔 달라짐
                  ? "tagmodalbtn"
                  : "selectedtagmodalbtn"
              }
              onClick={() => {
                setOpenInterestModal(true);
                setOpenRegionModal(false);
                setOpenCostModal(false);
              }}
            >
              {checkedItems.interest}
            </button>

            {openInterestModal && (
              <InterestModal
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                closeInterestModal={setOpenInterestModal}
              />
            )}

            <button
              className={
                checkedItems.region === "지역 선택"
                  ? "tagmodalbtn"
                  : "selectedtagmodalbtn"
              }
              onClick={() => {
                setOpenRegionModal(true);
                setOpenInterestModal(false);
                setOpenCostModal(false);
              }}
            >
              {checkedItems.region}
            </button>

            {openRegionModal && (
              <RegionModal
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                closeModal={setOpenRegionModal}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            )}

            <button
              className={
                checkedItems.cost === "비용 선택"
                  ? "tagmodalbtn"
                  : "selectedtagmodalbtn"
              }
              onClick={() => {
                setOpenCostModal(true);
                setOpenRegionModal(false);
                setOpenInterestModal(false);
              }}
            >
              {checkedItems.cost}
            </button>

            {openCostModal && (
              <CostModal
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                closeModal={setOpenCostModal}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            )}

            <button
              className="closebtn"
              onClick={() => {
                setCheckedItems({
                  region: "지역 선택",
                  cost: "비용 선택",
                  interest: "관심사선택",
                });
              }}
            >
              초기화
            </button>
          </div>
          <div className="editor-wrapper">
            <Editor
              ref={editorRef}
              placeholder="... 을 누르면 사진을 공유 할 수 있어요 !   제목은 두글자, 내용은 세글자 입력해야 게시물 등록이 가능합니다."
              initialValue=""
              previewStyle="vertical"
              height="calc(90vh - 370px)"
              initialEditType="wysiwyg"
              useCommandShortcut={false}
              onChange={handleEditor}
              onKeyup={isSubmitPost}
              hideModeSwitch={true}
              plugins={[colorSyntax]}
              language="ko-KR"
              name="editor"
              //이미지 첨부시 s3서버로 전송후 url받아옴
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const config = {
                    bucketName: "nondis3",
                    region: "ap-northeast-2",
                    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
                  };
                  //file s3 저장시 이름 겹치지 않게 new Date()사용. replace()로 특수문자 제거
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
                checkedItems={checkedItems}
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
          cancelButtonText: "닫기",
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
