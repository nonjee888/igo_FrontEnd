import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";
import { getMyplans, deleteMyplans } from "../../redux/modules/myplans";
//이미지
import add from "../../asset/add.png";
import deleteimg from "../../asset/deleteimg.png";
import edit from "../../asset/edit.png";
import calendarIcon from "../../asset/assetMypage/calendarIcon.png";
//삭제알림창
import Swal from "sweetalert2";

const Myplan = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const myplans = useSelector((state) => state.myplans.myplans);
  console.log(myplans);
  // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(getMyplans());
  }, [dispatch]);
  // console.log();

  const { id } = useParams();

  //삭제알림창
  const deleteAlert = () => {
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
        dispatch(deleteMyplans(id));
        // window.location.reload();
      }
    });
  };

  return (
    <div className="All">
      <div className="MyPosts">
        <div className="planTitle">
          <h3>나의 일정</h3>
          <img
            src={add}
            className="planAdd"
            alt="일정추가하기"
            onClick={() => {
              navigate("/myplanpost");
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {myplans?.map((myplans) => {
            return (
              <div className="Myplan" key={myplans.id}>
                <div className="MyplanDate">{myplans.time}</div>
                <div className="MyplanTitle">
                  {myplans.title}
                  <img src={edit} alt="수정하기" />
                </div>
                <img
                  src={myplans.imgUrl}
                  className="MyplanImg"
                  alt="내일정이미지"
                />
                <div className="MyplanContents">{myplans.content}</div>
                <button className="buttonDelete" onClick={deleteAlert}>
                  <img
                    src={deleteimg}
                    style={{ width: "15%" }}
                    alt="삭제버튼"
                  />
                </button>
                <button className="buttonAll">완료</button>
              </div>
            );
          })}
        </div>
        <h3 style={{ marginTop: "10%" }}>완료된 일정</h3>
        <div className="Myplan">
          <div className="MyplanDate1">2022/09/22</div>
          <div className="MyplanTitle1">
            제목
            <img src={edit} alt="수정하기" />
          </div>
          <img src="" className="MyplanImg" alt="내일정이미지완료" />
          <div className="MyplanContents">여기에 내용</div>
          <button className="buttonDelete" onClick={deleteAlert}>
            <img src={deleteimg} style={{ width: "15%" }} alt="삭제버튼" />
          </button>
          <button className="buttonAll">취소</button>
        </div>
      </div>
    </div>
  );
};

export default Myplan;
