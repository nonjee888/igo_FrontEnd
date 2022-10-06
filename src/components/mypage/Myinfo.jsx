import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putMyinfo, getMyinfo } from "../../redux/modules/myinfo";
import Swal from "sweetalert2";
//이미지
import profileImg from "../../asset/assetMypage/profileImg1.png";
import edit from "../../asset/edit.png";

const Myinfo = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const myinfo = useSelector((state) => state.myinfo.myinfo);
  console.log(myinfo);

  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getMyinfo());
  }, [dispatch]);

  const NICKNAME = localStorage.getItem("nickname");
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState([]);
  const [preview, setPreview] = useState("");

  const resetStates = () => {
    setNickname("");
    setProfileImage();
  };

  const onChangeImage = (e) => {
    console.log(e.target.files);
    setProfileImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let req = {
      nickname: nickname,
    };
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    let json = JSON.stringify(req);

    const nicknameblob = new Blob([json], { type: "application/json" });
    formData.append("nickname", nicknameblob);

    dispatch(putMyinfo(formData));
    resetStates();
    navigate("/myinfo");
    // window.location.reload();
  };

  return (
    <div className="All">
      {myinfo[0].profileImage === null ? (
        <form onSubmit={onSubmitHandler}>
          {/* 프로필사진 */}
          <div className="profileImage">
            <img
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : profileImg}
            />
            <label htmlFor="file" className="profileImginputLabel">
              변경하기
            </label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              id="file"
              className="profileImginput"
              onChange={onChangeImage}
              multiple="multiple"
            />
          </div>
          {/* 닉네임, 수정버튼 */}
          <div className="profileNickname">
            <input
              type="text"
              placeholder={NICKNAME}
              value={nickname}
              className="profileNickameinput"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button
              type="submit"
              style={{ border: "none", background: "transparent" }}
              onClick={() => {
                Swal.fire({
                  icon: "success",
                  text: "닉네임이 변경되었습니다.",
                  confirmButtonColor: "#47AFDB",
                  confirmButtonText: "확인",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/myinfo");
                  }
                });
              }}
            >
              <img
                src={edit}
                style={{ width: "30px", height: "25px" }}
                alt="닉네임수정버튼"
              />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmitHandler}>
          {/* 프로필사진 */}
          <div className="profileImage">
            <img
              alt="이미지를 업로드 해주세요."
              src={preview ? preview : myinfo[0].profileImage}
            />
            <label htmlFor="file" className="profileImginputLabel">
              변경하기
            </label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              id="file"
              className="profileImginput"
              onChange={onChangeImage}
              multiple="multiple"
            />
          </div>
          {/* 닉네임, 수정버튼 */}
          <div className="profileNickname">
            <input
              type="text"
              placeholder={myinfo[0].nickname}
              value={nickname}
              className="profileNickameinput"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button
              type="submit"
              style={{ border: "none", background: "transparent" }}
              onClick={() => {
                window.location.reload();
                Swal.fire({
                  icon: "success",
                  text: "닉네임이 변경되었습니다.",
                  confirmButtonColor: "#47AFDB",
                  confirmButtonText: "확인",
                });
              }}
            >
              <img
                src={edit}
                style={{ width: "30px", height: "25px" }}
                alt="닉네임수정버튼"
              />
            </button>
          </div>
        </form>
      )}
      {/* })}; */}
      {/* 관심 여행 키워드, 수정버튼 */}
      <div className="profileCategory">
        <div className="CategoryTitle">
          <h3 style={{ margin: "0 0 3% 5%" }}>관심 여행 키워드</h3>
          <img
            src={edit}
            style={{ width: "7%", height: "7%" }}
            alt="태그수정버튼"
          />
        </div>
        <div className="categoryGet">
          여기에카테고리겟으로가져오기 혼자 | 식도락| 액티브 |룰라랄라라라
        </div>
      </div>
      {/* 모아보기, 나의 일정 */}
      <div className="myListAll">
        <p
          onClick={() => {
            navigate("/mypostlist");
          }}
        >
          작성 게시글 모아보기
        </p>
        <p
          onClick={() => {
            navigate("/mylike");
          }}
        >
          🤍게시글 모아보기
        </p>
        <p
          onClick={() => {
            navigate("/myplan");
          }}
        >
          나의 일정 관리하기
        </p>
      </div>
    </div>
  );
};

export default Myinfo;
