import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import Post from "../post/Post";
import Tags from "./Tags";

// 취향 카테고리목록
export default function InterestedPostList() {
  const [postList, setPostList] = useState();
  const [interested, setInterested] = useState("혼자여행");
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

  let alone = postList?.filter((post) => {
    return interested === "혼자여행";
  });

  let couple = postList?.filter((post) => {
    return interested === "둘이여행";
  });

  let group = postList?.filter((post) => {
    return interested === "단체여행";
  });

  let costWorthy = postList?.filter((post) => {
    return interested === "가성비";
  });

  let luxury = postList?.filter((post) => {
    return interested === "럭셔리";
  });

  let relaxing = postList?.filter((post) => {
    return interested === "힐링";
  });

  let active = postList?.filter((post) => {
    return interested === "액티비티";
  });

  let foodie = postList?.filter((post) => {
    return interested === "식도락";
  });

  let insta = postList?.filter((post) => {
    return interested === "인스타감성";
  });

  //----------------관심사별분류-----------------//

  const getInterestList = async () => {
    const response = await instance.get(
      `/api/post/interest?type=${interested}`
    );
    console.log(interested);
    setPostList(response.data.data);
    return response.data.data;
  };

  useEffect(() => {
    getInterestList();
  }, [interested]);

  return (
    <div className="postListAll">
      <div className="tag-wrapper">
        {interestedList.map((item) => (
          <Tags
            key={item.name}
            selected={interested === item.name}
            handler={() => setInterested(item.name)}
            name={item.name}
            onClick={getInterestList}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
        <div className="content-wrapper">
          {interested === "혼자여행"
            ? alone?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "둘이여행"
            ? couple?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "단체여행"
            ? group?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "가성비"
            ? costWorthy?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "럭셔리"
            ? luxury?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "힐링"
            ? relaxing?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "액티비티"
            ? active?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : interested === "식도락"
            ? foodie?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : insta?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })}
        </div>
      </div>
    </div>
  );
}
