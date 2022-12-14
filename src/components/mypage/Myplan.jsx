import "./style.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";
import {
  getMyplans,
  deleteMyplans,
  postMyplanDone,
  postMyplanCancel,
} from "../../redux/modules/myplans";
//이미지
import add from "../../asset/add.png";
import deleteimg1 from "../../asset/deleteimg1.png";
import calendarIcon from "../../asset/assetMypage/calendarIcon.png";
import goingback from "../../asset/goingback.png";
//삭제알림창
import Swal from "sweetalert2";

const Myplan = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const myplans = useSelector((state) => state.myplans.myplans);
  // console.log(myplans);

  useEffect(() => {
    dispatch(getMyplans());
  }, [dispatch]);

  // done 완료 상태 필터로 뽑아내기
  let Origin = myplans?.filter((v) => v.done === 0);
  // console.log(Origin);
  let Done = myplans?.filter((v) => v.done === 1);
  // console.log(Done);

  return (
    <div className="All">
      <div className="MyPosts">
        <div className="MyPostsTitle">
          <div className="MyPageGoBack">
            <img
              src={goingback}
              onClick={() => {
                navigate(-1);
              }}
              alt=""
            />
          </div>
          <h3>나의 일정</h3>
          <div className="MyPlanAdd">
            <img
              src={add}
              className="planAdd"
              alt="일정추가하기"
              onClick={() => {
                navigate("/myplanpost");
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Origin?.length === 0 ? (
            <p
              className="myPageNoInfo1"
              onClick={() => {
                navigate("/myplanpost");
              }}
            >
              ➕을 눌러 일정을 작성해보세요.
            </p>
          ) : (
            <></>
          )}
          {Origin?.map((myplans) => {
            return (
              <div className="Myplan" key={myplans.id}>
                <div className="MyplanDate">{myplans.time}</div>
                <div className="MyplanTitle">{myplans.title}</div>
                <img
                  src={myplans.imgUrl}
                  className="MyplanImg"
                  alt="내일정이미지"
                />
                <div className="MyplanContents">{myplans.content}</div>
                <button
                  className="buttonDelete"
                  onClick={() => {
                    Swal.fire({
                      title: "일정삭제",
                      text: "정말로 삭제하시겠어요?",
                      imageUrl: calendarIcon,
                      imageWidth: 50,
                      imageHeight: 50,
                      showCancelButton: true,
                      confirmButtonColor: "#47AFDB",
                      cancelButtonColor: "#D9D9D9",
                      confirmButtonText: "삭제",
                      cancelButtonText: "취소",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteMyplans(myplans.id));
                      }
                    });
                  }}
                >
                  <img
                    src={deleteimg1}
                    style={{ width: "15%" }}
                    alt="삭제버튼"
                  />
                </button>
                <button
                  className="buttonAll"
                  onClick={() => {
                    dispatch(postMyplanDone(myplans.id));
                  }}
                >
                  완료
                </button>
              </div>
            );
          })}
        </div>
        <h3 style={{ margin: "10% 0 5% 10%" }}>완료된 일정</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Done?.length === 0 ? (
            <p className="myPageNoInfo1">완료된 일정이 없습니다.</p>
          ) : (
            <></>
          )}
          {Done?.map((myplans) => {
            return (
              <div className="Myplan" key={myplans.id}>
                <div className="MyplanDate1">{myplans.time}</div>
                <div className="MyplanTitle1">{myplans.title}</div>
                <img
                  src={myplans.imgUrl}
                  className="MyplanImg"
                  alt="내일정이미지완료"
                />
                <div className="MyplanContents">{myplans.content}</div>
                <button
                  className="buttonDelete"
                  onClick={() => {
                    Swal.fire({
                      title: "일정삭제",
                      text: "정말로 삭제하시겠어요?",
                      imageUrl: calendarIcon,
                      imageWidth: 50,
                      imageHeight: 50,
                      showCancelButton: true,
                      confirmButtonColor: "#47AFDB",
                      cancelButtonColor: "#D9D9D9",
                      confirmButtonText: "삭제",
                      cancelButtonText: "취소",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteMyplans(myplans.id));
                      }
                    });
                  }}
                >
                  <img
                    src={deleteimg1}
                    style={{ width: "15%" }}
                    alt="삭제버튼"
                  />
                </button>
                <button
                  className="buttonAll"
                  onClick={() => {
                    dispatch(postMyplanCancel(myplans.id));
                  }}
                >
                  취소
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Myplan;
