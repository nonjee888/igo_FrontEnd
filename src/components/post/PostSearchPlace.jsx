//카카오맵 서치바
import "./style.scss";
import React, { useState } from "react";
import PostKakaoMap from "./PostKakaoMap";

const SearchPlace = (props) => {
  const {
    id,
    title,
    content,
    tags,
    writerId,
    isActive,
    isEdit,
    overlayData,
    setOverlayData,
    checkedItems,
  } = props;
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form className="map-inputForm" onSubmit={handleSearch}>
        <input
          className="map-input"
          placeholder="장소를 검색해 주세요"
          onChange={(event) => setInputText(event.target.value)}
          value={inputText}
        />
        <button className="map-search-btn" type="submit">
          검색
        </button>
      </form>

      <PostKakaoMap
        props={props}
        id={id}
        title={title}
        content={content}
        tags={tags}
        writerId={writerId}
        isActive={isActive}
        isEdit={isEdit}
        overlayData={overlayData}
        setOverlayData={setOverlayData}
        checkedItems={checkedItems}
        searchPlace={place}
      />
    </>
  );
};

export default SearchPlace;
