import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";

// 가격 카테고리목록
export default function CostPostList() {
  const [postList, setPostList] = useState();
  const [cost, setCost] = useState(1);
  const costList = [
    {
      name: "10만원대",
      value: 1,
    },
    {
      name: "20만원대",
      value: 2,
    },
    {
      name: "30만원대",
      value: 3,
    },
    {
      name: "30만원이상",
      value: 4,
    },
  ];

  //----------------가격별분류-----------------//

  //   let ten = postList.filter((post) => {
  //     return cost === 1;
  //   });

  //   let twenty = postList.filter((post) => {
  //     return cost === 2;
  //   });

  //   let thirty = postList.filter((post) => {
  //     return cost === 3;
  //   });

  //   let overThirty = postList.filter((post) => {
  //     return cost === 4;
  //   });

  //----------------가격별분류-----------------//

  const getCostList = async () => {
    const response = await instance.get(`/api/post/cost?type=cost`);
    setPostList(response.data.data);
    return response.data.data;
  };

  useEffect(() => {
    getCostList();
  }, [cost]);

  return (
    <div className="All">
      <div className="tag-wrapper">
        {costList.map((item) => (
          <Tags
            key={item.name}
            selected={cost === item.value} //Tags 프롭스에서 selected는 아이템이름과 같은지 안같은지 판단
            handler={() => setCost(item.value)}
            name={item.name}
            onClick={getCostList}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
        <div className="content-wrapper">
          {/* {cost === 1
            ? ten?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : cost === 2
            ? twenty?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : cost === 3
            ? thirty?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : overThirty?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })} */}
        </div>
      </div>
    </div>
  );
}
