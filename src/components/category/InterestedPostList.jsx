import { useEffect, useState } from "react";
import { instance } from "../../shared/api";

import pleaseLogin from "../../asset/pleaseLogin.png";

import Post from "../post/Post";
import Tags from "./Tags";

// 취향 카테고리목록
export default function InterestedPostList() {
  const [postList, setPostList] = useState();
  const [interest, setinterest] = useState("혼자여행");
  const interestedList = [
    { name: "혼자여행" },

    { name: "둘이여행" },

    { name: "단체여행" },

    { name: "가성비" },

    { name: "럭셔리" },

    { name: "힐링" },

    { name: "액티비티" },

    { name: "식도락" },

    { name: "인스타감성" },
  ];

  //----------------관심사별분류-----------------//

  let alone =
    postList &&
    postList?.filter((post) => {
      return interest === "혼자여행";
    });

  let couple =
    postList &&
    postList?.filter((post) => {
      return interest === "둘이여행";
    });

  let group =
    postList &&
    postList?.filter((post) => {
      return interest === "단체여행";
    });

  let costWorthy =
    postList &&
    postList?.filter((post) => {
      return interest === "가성비";
    });

  let luxury =
    postList &&
    postList?.filter((post) => {
      return interest === "럭셔리";
    });

  let relaxing =
    postList &&
    postList?.filter((post) => {
      return interest === "힐링";
    });

  let active =
    postList &&
    postList?.filter((post) => {
      return interest === "액티비티";
    });

  let foodie =
    postList &&
    postList?.filter((post) => {
      return interest === "식도락";
    });

  let insta =
    postList &&
    postList?.filter((post) => {
      return interest === "인스타감성";
    });

  //----------------관심사별분류-----------------//

  const getInterestList = async () => {
    try {
      const response = await instance.get(
        `/api/posts/interest?type=${interest}`
      );
      setPostList(response.data.data);
      return response.data.data;
    } catch (error) {
      <div className="All">
        <div className="sorry">
          <img
            style={{ width: "100%", height: "100%", marginBottom: "10%" }}
            src={pleaseLogin}
            alt="sorry"
          />
        </div>
        <div style={{ textAlign: "center" }}>죄송합니다 다시 시도해주세요.</div>
      </div>;
    }
  };

  useEffect(() => {
    getInterestList();
  }, [interest]);

  return (
    <div className="postListAll">
      <div className="tag-wrapper">
        {interestedList.map((item) => (
          <Tags
            key={item.name}
            selected={interest === item.name}
            handler={() => setinterest(item.name)}
            name={item.name}
            onClick={getInterestList}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
        <div className="content-wrapper">
          {interest === "혼자여행"
            ? alone &&
              alone?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "둘이여행"
            ? couple &&
              couple?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "단체여행"
            ? group &&
              group?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "가성비"
            ? costWorthy &&
              costWorthy?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "럭셔리"
            ? luxury &&
              luxury?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "힐링"
            ? relaxing &&
              relaxing?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "액티비티"
            ? active &&
              active?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interest === "식도락"
            ? foodie &&
              foodie?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : insta &&
              insta?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })}
        </div>
      </div>
    </div>
  );
}
