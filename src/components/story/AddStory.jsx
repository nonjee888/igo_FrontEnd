import "./style.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postStory } from "../../redux/modules/story";
import Swal from "sweetalert2";
//이미지
import video from "../../asset/assetVideo/video.png";
import addVideo from "../../asset/assetVideo/addVideo.png";
import goback from "../../asset/goback.png";

const AddStory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [videos, setVideos] = useState([]);
  const [preview, setPreview] = useState("");

  // const FILE_SIZE_MAX_LIMIT = 10000;

  const resetStates = () => {
    setVideos();
  };
  console.log(videos.size);
  const onChangeVideos = (e) => {
    console.log(e.target.files);
    setVideos(e.target.files[0]);
    // if (videos.size >= FILE_SIZE_MAX_LIMIT) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "200MB이하의 영상만 첨부 가능합니다.",
    //     confirmButtonColor: "#BDE8F8",
    //     confirmButtonText: "확인",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //     }
    //   });
    //   return;
    // }
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("videos", videos);

    dispatch(postStory(formData));
    resetStates();
    navigate("/story");
  };

  return (
    <div className="All">
      <div className="MyPosts">
        <div className="planTitle">
          <h3>영상 남기기</h3>
          <p>15초 미만의 영상을 등록해주세요!</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="AddVideo">
            <img
              alt="영상을 업로드 해주세요."
              src={preview ? preview : video}
              style={{ display: "flex", width: "100%", height: "130px" }}
            />
            <label htmlFor="file" className="videoinputLabel">
              변경하기
            </label>
            <input
              type="file"
              accept="video/*"
              name="videos"
              id="file"
              className="planImginput"
              onChange={onChangeVideos}
              multiple="multiple"
            />
          </div>
          <div className="videoAddbuttons">
            <img
              src={goback}
              alt="뒤로"
              onClick={() => {
                navigate(-1);
              }}
              style={{ height: "50%" }}
            />
            <button className="videoAdd" type="submit">
              <img src={addVideo} alt="영상등록" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStory;
