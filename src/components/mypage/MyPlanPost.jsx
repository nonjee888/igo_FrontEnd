import React, { useState, useRef } from "react";
//날짜 선택 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

//이미지
import photo from "../../asset/assetMypage/photo.png";
import calendar from "../../asset/assetMypage/calendar.png";

const MyPlanPost = () => {
  //날짜
  const [startDate, setStartDate] = useState(new Date());
  //이미지 등록
  const [Image, setImage] = useState(photo);
  const fileInput = useRef(null);
  const onChange = (e) => {
    // if (e.target.files[0]) {
    //   setFile(e.target.files[0]);
    // } else {
    //   //업로드 취소할 시
    //   setImage(photo);
    //   return;
    // }

    //화면에 선택사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="All">
      <div className="MyPosts">
        <div className="planTitle">
          <h3>나의 일정 등록하기</h3>
        </div>
        <div className="MyplanPost">
          <div className="MyplanPostDate">
            <DatePicker
              className="DatePicker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale={ko}
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="MyplanPostTitle">
            제목:　
            <input
              type="text"
              style={{ width: "75%", border: "none" }}
              placeholder="제목을 입력해주세요."
            />
          </div>
          <img
            className="PostimgBox"
            src={Image}
            onClick={() => {
              fileInput.current.click();
            }}
            alt=""
          />
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="photo"
            onChange={onChange}
            ref={fileInput}
          />
          <div className="MyplanPostContents">
            <textarea name="content" placeholder="일정을 입력해주세요." />
          </div>
        </div>
      </div>
      <div className="MyplanPostAddbutton">
        <img src={calendar} alt="일정등록" />
      </div>
    </div>
  );
};

export default MyPlanPost;
