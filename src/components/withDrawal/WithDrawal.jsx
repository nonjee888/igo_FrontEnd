import React from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyinfo } from "../../redux/modules/myinfo";
import { navigate,useNavigate } from "react-router-dom";
import { instance } from "../../shared/api";
import Swal from "sweetalert2";
import { useState } from "react";



export default function WithDrawal () {

  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [isClick,setIsClick]=useState(false);
  const {myinfo} =useSelector((state)=>state?.myinfo);
  console.log(myinfo&&myinfo[0]?.id)
  console.log(myinfo)
  useEffect(() => {
    dispatch(getMyinfo());
  }, []);
  

  const submitHandler = async (e) => {
    let id = myinfo && myinfo[0]?.id
    const response = await instance.delete(`/api/member/withdrawal/${id}`);
    if (response.data.success) {
      window.location.replace("/")
    } 
    console.log(response.data.success)
  
  }
      
  
        
    //내일 백엔드분들이랑 데이터삭제되는거 머있는지 이야기해볼것.
  return (

    <div className="All">
        
        <div>
        <div className="ListBox" >
            
            
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
        <div className="inputBox" >
        <input 
        type="checkbox"
        onClick={setIsClick}></input>
        <div>위 내용을 모두 확인하였으며, 이에 동의합니다.</div>
        </div>

         </div>
        <button className={isClick ? "sumitbtn" : "unsumitbtn"} onClick={submitHandler}>계정삭제하기</button>
        
       
    </div>
  )
}
