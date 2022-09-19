import React from "react";
import "./style.scss";
import search from "../../asset/search.png";

const Search = () => {
  return (
    <>
      <div className="input-wrapper">
        <input type="search" className="SearchBar"></input>
        <img className="Icon" src={search} />
      </div>
    </>
  );
};

export default Search;
