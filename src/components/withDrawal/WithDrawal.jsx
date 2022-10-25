import React from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";
import { useState } from "react";
import { deleteCookie } from "../../shared/cookie";
import drawalimg from "../../asset/drawalimg.png";
import pleaseLogin from "../../asset/pleaseLogin.png";

export default function WithDrawal() {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const { myinfo, error } = useSelector((state) => state?.myinfo);

  useEffect(() => {
    if (
      localStorage.getItem("ACCESS_TOKEN") &&
      localStorage.getItem("nickname")
    )
      dispatch(getMyinfo());
  }, []);

  if (error) {
    return (
      <div className="All">
        <div className="sorry">
          <img
            style={{ width: "100%", height: "100%", marginBottom: "10%" }}
            src={pleaseLogin}
            alt="sorry"
          />
        </div>
        <div style={{ textAlign: "center" }}>죄송합니다 다시 시도해주세요.</div>
      </div>
    );
  }

  const submitHandler = async (e) => {
    let id = myinfo && myinfo[0]?.id;
    console.log(id);
    const response = await instance.delete(`/api/member/withdrawal/${id}`);
    console.log(response);
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
        deleteCookie("Authorization");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("nickname");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.replace("/");
      } else {
        Swal.fire({
          icon: "error",
          text: "오류가 있어요! 관리자에게 문의해주세요😿",
          consfirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });
      }
    });
  };

  return (
    <div className="All">
      <div>
        <img className="drawalimg" src={drawalimg} alt="" />
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
