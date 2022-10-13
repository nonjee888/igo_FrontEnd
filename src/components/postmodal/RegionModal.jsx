import React, { useState } from "react";
import "./style.scss";

export default function RegionModal({
  isChecked,
  setIsChecked,
  closeModal,
  checkedItems,
  setCheckedItems,
}) {
  const regionList = [
    { id: 0, tag: "전체" },
    { id: 1, tag: "서울/경기" },
    { id: 2, tag: "대전" },
    { id: 3, tag: "세종" },
    { id: 4, tag: "인천" },
    { id: 5, tag: "대구" },
    { id: 6, tag: "강원도" },
    { id: 7, tag: "울산" },
    { id: 8, tag: "충청도" },
    { id: 9, tag: "광주" },
    { id: 10, tag: "전라도" },
    { id: 11, tag: "부산" },
    { id: 12, tag: "경상도" },
    { id: 13, tag: "제주도" },
  ];

  const [RegionList] = useState(regionList);
  const [choiceTagID, setChoiceTagID] = useState(0);
  const [clickValue, setClickValue] = useState(false);
  const [btnActive, setBtnActive] = useState("");

  const ClickTagBtn = (id) => {
    setChoiceTagID(id);
    setClickValue(!clickValue);
    RegionList[id].isChecked = !clickValue;
    setBtnActive((prev) => {
      return prev;
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (isChecked) {
      setCheckedItems(checkedItems);
    }
    if (checkedItems.size > 1) {
      checkedItems.delete();
      setCheckedItems(checkedItems);
      e.preventDefault();
      window.alert("최대 3개까지 선택가능합니다");
    } else {
      setIsChecked(!isChecked);
      setCheckedItems({ ...checkedItems, region: value });
      closeModal(false);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="conStyle">
          {RegionList.map((item) => (
            <label tag={item} key={item.tag}>
              <input
                className="tagselectbox"
                style={{ display: "none" }}
                type="checkbox"
                name="tag"
                id={item.id}
                value={item.tag}
                onChange={changeHandler}
                onClick={() => {
                  ClickTagBtn(item.id);
                }}
              />
              {item.isChecked ? (
                <div
                  style={{
                    width: "40%",
                    position: "relative",
                    display: "inline-block",
                    textAlign: "center",
                    margin: "5px 10px 5px 10px",
                    borderRadius: "22px",
                    background: "#ffffff",
                  }}
                >
                  {item.tag}
                </div>
              ) : (
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
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
