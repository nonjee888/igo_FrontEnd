import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postMyplans } from "../../redux/modules/myplans";
import Swal from "sweetalert2";
//이미지
import photo1 from "../../asset/assetMypage/photo1.png";
import calendar from "../../asset/assetMypage/calendar.png";
import goback from "../../asset/goback.png";

const MyPlanPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState("");

  const resetStates = () => {
    setTime("");
    setTitle("");
    setImages();
    setContent("");
  };

  const onChangeImage = (e) => {
    // console.log(e.target.files);
    setImages(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (event) => {
    if (title === "" || content === "" || time === "") {
      Swal.fire({
        icon: "info",
        text: "날짜와 제목, 사진과 내용을 입력해주세요🥰",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        }
      });
    }
    event.preventDefault();
    let req = {
      time: time,
      title: title,
      content: content,
    };

    const formData = new FormData();
    formData.append("images", images);

    let json = JSON.stringify(req);

    const timeblob = new Blob([json], { type: "application/json" });
    formData.append("time", timeblob);

    const titleblob = new Blob([json], { type: "application/json" });
    formData.append("title", titleblob);

    const contentblob = new Blob([json], { type: "application/json" });
    formData.append("content", contentblob);

    dispatch(postMyplans(formData));
    resetStates();
  };

  return (
    <div className="All">
      <div className="MyPosts">
        <div className="planTitle">
          <h3>나의 일정 등록하기</h3>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="MyplanPost">
            <div className="MyplanPostDate">
              <input
                type="date"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={time}
              />
            </div>
            <div className="MyplanPostTitle">
              제목:　
              <input
                type="text"
                style={{ width: "75%", border: "none" }}
                placeholder="날짜를 선택하고, 제목을 작성해주세요."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
            <img
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : photo1}
              className="MyplanPostImg1"
            />
            <label htmlFor="file" className="planImginputLabel">
              변경하기
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              className="planImginput"
              onChange={onChangeImage}
            />
            <div className="MyplanPostContents">
              <textarea
                name="content"
                placeholder="*사진첨부필수*  일정을 작성해주세요. "
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              />
            </div>
          </div>
          <div className="MyplanPostAddbuttons">
            <img
              src={goback}
              alt="뒤로"
              onClick={() => {
                navigate(-1);
              }}
              className="MyplanPostGoback"
            />
            <button className="MyplanPostAdd" type="submit">
              <img src={calendar} alt="일정등록" loading="lazy" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyPlanPost;
