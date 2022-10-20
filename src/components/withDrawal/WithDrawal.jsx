import React from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";
import { useState } from "react";
import drawalimg from "../../asset/drawalimg.png";

export default function WithDrawal() {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const { myinfo } = useSelector((state) => state?.myinfo);

  useEffect(() => {
    dispatch(getMyinfo());
  }, []);

  const submitHandler = async (e) => {
    let id = myinfo && myinfo[0]?.id;
    const response = await instance.delete(`/api/member/withdrawal/${id}`);
    Swal.fire({
      icon: "warning",
      text: "정말 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#47AFDB",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (response.data.success) {
        window.location.replace("/");
      }
    });
  };

  return (
    <div className="All">
      <div>
        <img className="drawalimg" src={drawalimg} />
        <div className="ListBox">
          <li className="listText">
            계정 삭제시, 개인 정보는 일괄 <span>삭제 처리</span>됩니다.
          </li>

          <li className="listText">
            계정 삭제 이후, 재가입하여도 이전 데이터는 <br />
            <span> 복구되지 않습니다.</span>
          </li>

          <li className="listText">
            계정 삭제시, 작성된 모든 게시물이 삭제되지만
            <span> 회원님의 좋아요,신고 기록은 남아있습니다.</span>
          </li>
        </div>
        <div className="inputBox">
          <input type="checkbox" onClick={setIsClick}></input>
          <div>위 내용을 모두 확인하였으며, 이에 동의합니다.</div>
        </div>
      </div>
      <button
        className={isClick ? "sumitbtn" : "unsumitbtn"}
        onClick={submitHandler}
      >
        계정삭제하기
      </button>
    </div>
  );
}
