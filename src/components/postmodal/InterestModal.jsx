import React, { useState } from "react";
import "./style.scss";

export default function InterestModal({
  checkedItems,
  setCheckedItems,
  closeInterestModal,
  openInterestNextModal,
}) {
  const [isChecked, setIsChecked] = useState(false); //체크여부

  

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

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (isChecked) {
      setCheckedItems(checkedItems);
    }
    console.log(e.target.value);
    setIsChecked(!isChecked);
    setCheckedItems({ ...checkedItems, interest: value });
  };
  const submitHandler = (e) => {
    setCheckedItems({ ...checkedItems });
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="conStyle">
          {interestedList.map((item) => (
            <label key={item.tag}>
              <input
                type="checkbox"
                style={{ display: "none" }}
                name="tag"
                value={item.tag}
                onChange={changeHandler}
              />
              <div>{item.tag}</div>
            </label>
          ))}
        </div>
        <div className="buttonbox">
          <button
            className="닫기버튼"
            onClick={() => closeInterestModal(false)}
          >
            취소
          </button>
          <button
            className="다음"
            onClick={() => {
              openInterestNextModal();
              submitHandler();
            }}
          >
            다음단계
          </button>
        </div>
      </div>
    </div>
  );
}
