import { useState, useRef } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postStory } from "../../redux/modules/story";
import Swal from "sweetalert2";
//이미지
import video from "../../asset/assetVideo/video.png";
import addVideo from "../../asset/assetVideo/addVideo.png";
import videoInfo from "../../asset/assetVideo/videoInfo.png";
import goback from "../../asset/goback.png";
import deleteimg from "../../asset/deleteimg.png";

const AddStory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetStates = () => {
    setVideos();
  };

  const [videos, setVideos] = useState([]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (videos.length === 0) {
      Swal.fire({
        icon: "info",
        text: "동영상을 첨부해주세요🥰",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("videos", videos);
      dispatch(postStory(formData));
      resetStates();
    }
  };

  // 동영상 200MB 크기 제한
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const validateSelectedFile = (e) => {
    const MAX_FILE_SIZE = 204800; // 200MB
    const fileSizeKiloBytes = videos.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg(
        Swal.fire({
          icon: "error",
          text: "업로드 가능한 용량(200MB)을 초과하였습니다. 다시 선택해 주세요.",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      );
      setIsSuccess(false);
      return;
    }

    setErrorMsg("");
    setIsSuccess(true);
  };

  //첨부동영상 프리뷰
  const [videoPreview, setVideoPreview] = useState(null);
  const filePicekerRef = useRef(null);
  const NICKNAME = localStorage.getItem("nickname");
  const token = localStorage.getItem("ACCESS_TOKEN");
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setVideos(event.target.files[0]);
    }
    // console.log(event.target.files);

    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("video")) {
        setVideoPreview(readerEvent.target.result);
      }
    };
  };

  function clearFiles() {
    setVideoPreview(null);
  }

  return (
    <>
      {NICKNAME && token ? (
        <div className="All">
          <div className="MyPosts">
            <div className="planTitle">
              <h3>영상 남기기</h3>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="AddVideo">
                <div className="btn-container">
                  <input
                    ref={filePicekerRef}
                    accept="video/*"
                    name="videos"
                    onChange={handleFileChange}
                    type="file"
                    hidden
                  />
                  <div
                    className="btn"
                    onClick={() => filePicekerRef.current.click()}
                  >
                    <img
                      src={video}
                      alt="영상을 업로드 해주세요."
                      loading="lazy"
                    />
                  </div>
                  {videoPreview && (
                    <div className="videoXBtn" onClick={clearFiles}>
                      <img src={deleteimg} alt="삭제버튼" loading="lazy" />
                    </div>
                  )}
                </div>
                <div className="videoAddInfo">
                  <img src={videoInfo} alt="영상첨부정보" loading="lazy" />
                </div>
                <div className="videoPreview">
                  {videoPreview != null && (
                    <video
                      controls
                      controlsList="nodownload"
                      src={videoPreview}
                    />
                  )}
                </div>

                <div className="error-message">{errorMsg}</div>
              </div>
              <div className="videoAddbuttons">
                <img
                  src={goback}
                  alt="뒤로"
                  onClick={() => {
                    navigate(-1);
                  }}
                  style={{ width: "15%", height: "30%" }}
                />
                <button
                  className="videoAdd"
                  type="submit"
                  onClick={validateSelectedFile}
                >
                  <img src={addVideo} alt="영상등록" loading="lazy" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        Swal.fire({
          icon: "error",
          text: "로그인을 하셔야 이용 가능합니다.",
          confirmButtonColor: "#47AFDB",
          cancelButtonColor: "#D9D9D9",
          confirmButtonText: "로그인하러가기",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/");
          }
        })
      )}
    </>
  );
};

export default AddStory;
