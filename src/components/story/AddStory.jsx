import React, { useState, useRef } from "react";
//이미지
import video from "../../asset/assetVideo/video.png";
import addVideo from "../../asset/assetVideo/addVideo.png";

const AddStory = () => {
  //이미지 등록
  const [Video, setVideo] = useState(video);
  const fileInput = useRef(null);

  const onChange = (e) => {
    // if (e.target.files[0]) {
    //   setFile(e.target.files[0]);
    // } else {
    //   //업로드 취소할 시
    //   setVideo(video);
    //   return;
    // }

    //화면에 선택사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setVideo(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="All">
      <div className="MyPosts">
        <div className="planTitle">
          <h3>영상 남기기</h3>
          <p>15초 미만의 영상을 등록해주세요!</p>
        </div>
        <div className="AddVideo">
          <img
            className="PostimgBox"
            src={Video}
            onClick={() => {
              fileInput.current.click();
            }}
            alt=""
          />
          <input
            type="file"
            style={{ display: "none" }}
            accept="video/*"
            onChange={onChange}
            ref={fileInput}
          />
        </div>
      </div>
      <div className="MyplanPostAddbutton">
        <img src={addVideo} alt="영상등록" />
      </div>
    </div>
  );
};
export default AddStory;
