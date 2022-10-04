import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postMyplans } from "../../redux/modules/myplans";
//이미지
import photo from "../../asset/assetMypage/photo.png";
import calendar from "../../asset/assetMypage/calendar.png";

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
    console.log(e.target.files);
    setImages(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const data = {
    title: title,
    content: content,
    time: time,
  };
  //value를 setState해준다
  console.log(data);

  const onSubmitHandler = async (event) => {
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
    navigate("/myplan");
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
                placeholder="제목을 입력해주세요."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
            <img
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : photo}
              style={{ display: "block", margin: "5px auto", height: "100px" }}
            ></img>
            <input
              style={{ display: "block", margin: "0 auto" }}
              type="file"
              accept="image/*"
              name="image"
              className="imginput"
              onChange={onChangeImage}
              multiple="multiple"
            />
            <div className="MyplanPostContents">
              <textarea
                name="content"
                placeholder="일정을 입력해주세요."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              />
            </div>
          </div>
          <button className="MyplanPostAddbutton" type="submit">
            <img src={calendar} alt="일정등록" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPlanPost;
