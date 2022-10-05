import "./style.scss";
import React, { useState, useRef } from "react";

const Search = () => {
  const inputEl = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState(2);
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const getSearchTerm = () => {};

  return <></>;
};

export default Search;
