//카카오맵 서치바
import React, { useState, useRef } from "react";
import PostKakaoMap from "./PostKakaoMap";

const SearchPlace = (props) => {
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
          placeholder="Search Place..."
          onChange={(event) => setInputText(event.target.value)}
          value={inputText}
        />
        <button className="map-search-btn" type="submit">
          검색
        </button>
      </form>

      <PostKakaoMap props={props} searchPlace={place} />
    </>
  );
};

export default SearchPlace;
