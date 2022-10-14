import React, { useState } from "react";
import "./style.scss";

export default function InterestModal({
  isChecked,
  setIsChecked,
  checkedItems,
  setCheckedItems,
  closeInterestModal,
}) {
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

  const [InterestList] = useState(interestedList);
  const [choiceTagID, setChoiceTagID] = useState(0);
  const [clickValue, setClickValue] = useState(false);
  const [btnActive, setBtnActive] = useState("");

  const clickTagBtn = (id) => {
    setChoiceTagID(id);
    // setClickValue(!clickValue);
    InterestList[id].isChecked = !clickValue;
    setBtnActive((prev) => {
      return prev;
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (isChecked) {
      setCheckedItems(checkedItems);
    }
    setIsChecked(!isChecked);
    setCheckedItems({ ...checkedItems, interest: value });
    closeInterestModal(false);
  };
  const submitHandler = () => {
    setCheckedItems({ ...checkedItems });
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="conStyle">
          {InterestList.map((item) => (
            <label tag={item} key={item.id}>
              <input
                className="tagselectbox"
                style={{ display: "none" }}
                type="checkbox"
                name="tag"
                id={item.id}
                value={item.tag}
                onChange={changeHandler}
                onClick={() => {
                  clickTagBtn(item.id);
                }}
              />

              <div
                style={{
                  width: "40%",
                  position: "relative",
                  display: "inline-block",
                  textAlign: "center",
                  margin: "5px 10px 5px 10px",
                  borderRadius: "22px",
                  background: "#BDE8F8",
                }}
              >
                {item.tag}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
