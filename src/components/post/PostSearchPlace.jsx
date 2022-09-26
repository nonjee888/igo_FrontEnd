import React, { useState } from "react";
import PostKakaoMap from "./PostKakaoMap";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form className="map-inputForm" onSubmit={handleSubmit}>
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

      <PostKakaoMap searchPlace={place} />
    </>
  );
};

export default SearchPlace;
