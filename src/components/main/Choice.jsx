import React, { useState } from "react";
import "./style.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { instance } from "../../shared/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Choice = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const interestedList = [
    { id: 0, tag: "혼자여행" },
    { id: 1, tag: "둘이여행" },
    { id: 2, tag: "단체여행" },
    { id: 3, tag: "가성비" },
    { id: 4, tag: "럭셔리" },
    { id: 5, tag: "힐링" },
    { id: 6, tag: "액티비티" },
    { id: 7, tag: "식도락" },
    { id: 8, tag: "인스타감성" },
  ];

  const [isChecked, setIsChecked] = useState(false); //체크여부
  const [checkedItems, setCheackedItems] = useState(new Set()); //체크된요소들
  const [InterestedList] = useState(interestedList);
  const [choiceTagID,setChoiceTagID]=useState(0);
  const[clickValue,setClickValue]=useState(false);
  const[btnActive,setBtnActive]=useState(false);


  const clickTagbtn = (id) => {

    setChoiceTagID(id);
    setClickValue(clickValue);
    InterestedList[id].isChecked =!clickValue;
    setBtnActive((prev) => {
      return prev;
    });
  };


  const checkHandler = (e) => {
    // console.log(e.target.isChecked)
    // if(e.target.checked === true){
    //   setIsChecked(false)
    // }else{
    //   setIsChecked(true)
    // }
    // setIsChecked(isChecked);
    checkedItemHandler(
      e.target.value,
      e.target.checked,
    ); 
     
  };


  const submitHandler = async (e) => {
  
    let payload = {
      interested: [...checkedItems],
    }; console.log(payload)
    const response = await instance.patch("/api/member/tag", payload);
    console.log(response.data.success===true);
    if(response.data.success===true){ //이 데이터가 체크되지 않았으면 추천페이지로 못감 
        return Navigate("/recommend");
    }
  
  };

  const checkedItemHandler = ( id, isChecked ) => {
    if (isChecked) {
      //체크되었을때
      checkedItems.add(id); //체크시 삽입
      setCheackedItems(checkedItems); //체크요소넣어주기

      if (checkedItems.size === 3) {
        setCheackedItems(checkedItems);

        Swal.fire({
          icon: "info",
          text: "최대 3개 선택 가능합니다.",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        });

        
      }

    } else if (!isChecked && checkedItems.has(id)) {
      //체크가 안되있고 ,id가 있을때(클릭2번시)
      checkedItems.delete(id); //체크두번시삭제
      setCheackedItems(checkedItems);
     
      
    
    }
   
    return checkedItems;
    

  };
 

  return (
    <div className="All">
      <div className="choiceBox">
        <div className="conStyle">
          {InterestedList.map((item) => (
            <label tag={item} key={item.id}>
              <input
               className="interestcheck"
                type="checkbox"
                name="tag"
                id={item.id}
                value={item.tag}
                onChange={(e) => checkHandler(e)}
                onClick={()=> clickTagbtn(item.id)}
                disabled={checkedItems.size >= 3 ? true : false}
              />
              <div className={item.isChecked? "tagcheck":"untagcheck"}>{item.tag}</div>

            
               
            </label>
          ))}
        </div>
      </div>
      <div className="btnBox">
        <button className="joinbtn" onClick={()=>{setClickValue(true);
        window.location.reload()}}>다시선택하기</button>
        <button className="joinbtn" onClick={() =>{submitHandler()}}>내돈내여 시작하기</button>
        
          
       
      </div>
    </div>
  );
};

export default Choice;