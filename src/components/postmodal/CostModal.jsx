import React, { useState } from "react";
import "./style.scss";

export default function CostModal({
  closeModal,
  checkedItems,
  setCheckedItems,
}) {
  const [isChecked, setIsChecked] = useState(false); //체크여부

  const costList = [
    { id: 1, tag: "10만원대" },
    { id: 2, tag: "20만원대" },
    { id: 3, tag: "30만원대" },
    { id: 4, tag: "30만원이상" },
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (isChecked) {
      setCheckedItems(checkedItems);
    }

    setIsChecked(!isChecked);
    setCheckedItems({ ...checkedItems, cost: value });
  };
  const submitHandler = () => {
    setCheckedItems({ ...checkedItems });
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="conStyle">
          {costList.map((item) => (
            <label key={item.tag}>
              <input className="tagselectbox"
              style={{display:"none"}}
                type="checkbox"
                name="tag"
                value={item.tag}
                onChange={changeHandler}
              />
              <div
              style=
              {{width:"40%",
              position:"relative",
              display:"inline-block",
              textAlign:"center",
              margin:"5px 10px 5px 10px",
              borderRadius:"22px",
              background:"#BDE8F8"
      

              }}>{item.tag}</div>
            </label>
          ))}
        </div>
        <div className="buttonbox">
          <button className="closebtn" onClick={() => closeModal(false)}>
            취소
          </button>
          <button
            className="closebtn"
            onClick={() => {
              closeModal(false);
              submitHandler();
            }}
          >
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
}
