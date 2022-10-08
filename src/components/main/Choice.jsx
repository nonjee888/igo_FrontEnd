import React, { useState } from "react";
import "./style.scss";
import { navigate, useNavigate } from "react-router-dom";
import { instance } from "../../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Choice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const interestedList = [
    { id: 1, tag: "혼자여행" },
    { id: 2, tag: "둘이여행" },
    { id: 3, tag: "단체여행" },
    { id: 4, tag: "가성비" },
    { id: 5, tag: "럭셔리" },
    { id: 6, tag: "힐링" },
    { id: 7, tag: "액티비티" },
    { id: 8, tag: "식도락" },
    { id: 9, tag: "인스타감성" },
  ];

  const [isChecked, setIsChecked] = useState(false); //체크여부
  const [checkedItems, setCheackedItems] = useState(new Set()); //체크된요소들

  const checkHandler = (e) => {
    setIsChecked(!isChecked);
    checkedItemHandler(
      e.target.parentNode,
      e.target.value,
      e.target.checked,
      e
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let payload = {
      interested: [...checkedItems],
    };
    const response = await instance.post("/api/member/tag", payload);
    console.log(response);
    // if(response.data.suscess){ //이 데이터가 체크되지 않았으면 추천페이지로 못감 
    //     navigate("/recommend");
    // }
  
  }; //선택한 값이 가긴가는데 한글값"여행"을 수정해줘야 함

  const checkedItemHandler = (box, id, isChecked, e) => {
    if (isChecked) {
      //체크되었을때
      checkedItems.add(id); //체크시 삽입
      setCheackedItems(checkedItems); //체크요소넣어주기
      box.style.backgroundColor = "#A3D7ED"; //스타일변경

      if (checkedItems.size > 3) {
        checkedItems.delete(id);
        setCheackedItems(checkedItems);
        box.style.backgroundColor = "#fffff";
        e.preventDefault();
        window.alert("최대 3개까지 선택가능합니다");
      }
    } else if (!isChecked && checkedItems.has(id)) {
      //체크가 안되있고 ,id가 있을때(클릭2번시)
      checkedItems.delete(id); //체크두번시삭제
      setCheackedItems(checkedItems);
      box.style.backgroundColor = "#fffff";
    }
    return checkedItems;

    //이제 다다가 해야할일 : 3개이상 체크시 alert띠워서 3개만 체크 가능하다고 하기랑 제한두기
  };

  // useEffect(()=> {
  //   if(token) {
  //     getUser()
  //     if(data.userData.interested ===''||data.userData.interestedList.length ===0) {
  //       navigate('/choice')
  //     }
  //   }
  // })

  return (
    <div className="All">
      <div className="choiceBox">
        <div className="conStyle">
          {interestedList.map((item) => (
            <label key={item.id} className="innerBox">
              <input
                type="checkbox"
                value={item.tag}
                onChange={(e) => checkHandler(e)}
              />
              <div>{item.tag}</div>
            </label>
          ))}
        </div>
      </div>
      <div className="btnBox">
        <button className="joinbtn" onClick={submitHandler}>
          내돈내여 시작하기
        </button>
      </div>
    </div>
  );
};

export default Choice;