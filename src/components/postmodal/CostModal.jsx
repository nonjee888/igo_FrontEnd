import React, { useState } from "react";
import "./style.scss";

export default function CostModal({
  isChecked,
  setIsChecked,
  closeModal,
  checkedItems,
  setCheckedItems,
}) {
  const costList = [
    { id: 0, tag: "10만원대" },
    { id: 1, tag: "20만원대" },
    { id: 2, tag: "30만원대" },
    { id: 3, tag: "30만원이상" },
  ];

  const [CostList] = useState(costList);
  const [choiceTagID, setChoiceTagID] = useState(1);
  const [clickValue, setClickValue] = useState(false);
  const [btnActive, setBtnActive] = useState("");

  const clickTagBtn = (id) => {
    setChoiceTagID(id);
    setClickValue(!clickValue);
    CostList[id].isChecked = !clickValue;
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
    setCheckedItems({ ...checkedItems, cost: value });
    closeModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="conStyle">
          {CostList.map((item) => (
            <label tag={item} key={item.id}>
              <input
                className="tagselectbox"
                style={{ display: "none" }}
                type="checkbox"
                name="tag"
                id={item.id}
                value={item.tag}
                onChange={changeHandler}
                onClick={() => clickTagBtn(item.id)}
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
