import React, { useState } from "react";
import Post from "../post/Post";

const ListChanger = () => {
  let [latest, setLatest] = useState(false);
  let [mostliked, setMostliked] = useState(false);
  let [mostPopular, setMostPolular] = useState(false);

  const onClickHandler = () => {};

  return (
    <>
      <div className="changer-wrapper">
        <div
          className="list"
          onClick={() => {
            setLatest(true);
          }}
        >
          최신순
        </div>
        <div className="line"></div>
        <div
          className="list"
          onClick={() => {
            setMostliked(true);
          }}
        >
          추천순
        </div>
        <div className="line"></div>
        <div
          className="list"
          onClick={() => {
            setMostPolular(true);
          }}
        >
          조회순
        </div>
      </div>
      <div className="content-wrapper">
        {latest === true ? <Post /> : null}
        {mostliked === true ? <Post /> : null}
        {mostPopular === true ? <Post /> : null}
      </div>
    </>
  );
};

export default ListChanger;
