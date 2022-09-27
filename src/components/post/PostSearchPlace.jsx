//카카오맵 서치바
import React, { useState, useRef } from "react";
import PostKakaoMap from "./PostKakaoMap";

const SearchPlace = ({
  // handleRegisterButton,
  setMapData,
  title,
  inputCost,
  editor,
}) => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

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
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button className="map-search-btn" type="submit">
          검색
        </button>
      </form>

      <PostKakaoMap
        searchPlace={place}
        // handleRegisterButton={handleRegisterButton}
        title={title}
        inputCost={inputCost}
        setMapData={setMapData}
      />
    </>
  );
};

export default SearchPlace;
