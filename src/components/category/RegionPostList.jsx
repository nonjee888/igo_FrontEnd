import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";
import Post from "../post/Post";

// 지역 카테고리목록
export default function RegionPostList() {
  const [region, setRegion] = useState("전체");
  const [postList, setPostList] = useState();

  const regionList = [
    {
      name: "전체",
    },
    {
      name: "서울/경기권",
    },
    {
      name: "대전",
    },
    {
      name: "세종",
    },
    {
      name: "인천",
    },
    {
      name: "대구",
    },
    {
      name: "강원도",
    },
    {
      name: "울산",
    },
    {
      name: "충청도",
    },
    {
      name: "광주",
    },
    {
      name: "전라도",
    },
    {
      name: "부산",
    },
    {
      name: "경상도",
    },
    {
      name: "제주도",
    },
  ];

  //-----------------지역별분류-------------------//

  let allRegion = postList?.filter((post) => {
    return region === "전체";
  });

  let seoul = postList?.filter((post) => {
    return region === "서울/경기권";
  });

  let daejeon = postList?.filter((post) => {
    return region === "대전";
  });

  let sejeong = postList?.filter((post) => {
    return region === "세종";
  });

  let incheon = postList?.filter((post) => {
    return region === "인천";
  });

  let daegu = postList?.filter((post) => {
    return region === "대구";
  });

  let gangwon = postList?.filter((post) => {
    return region === "강원도";
  });

  let ulsan = postList?.filter((post) => {
    return region === "울산";
  });

  let chungcheong = postList?.filter((post) => {
    return region === "충청도";
  });

  let gwangju = postList?.filter((post) => {
    return region === "광주";
  });

  let jeolla = postList?.filter((post) => {
    return region === "전라도";
  });

  let busan = postList?.filter((post) => {
    return region === "부산";
  });

  let gyeongsang = postList?.filter((post) => {
    return region === "경상도";
  });

  let jeju = postList?.filter((post) => {
    return region === "제주도";
  });

  //-----------------지역별분류-------------------//

  const getRegionList = async () => {
    const response = await instance.get(`/api/post/region?type=${region}`);
    setPostList(response.data.data);
    return response.data.data;
  };

  useEffect(() => {
    getRegionList(); //dispatch쓰지 않고 불러오는방법^^
  }, [region]);

  return (
    <div className="All">
      <div className="tag-wrapper">
        {regionList.map((item) => (
          <Tags
            key={item.name}
            selected={region === item.name}
            handler={() => setRegion(item.name)}
            name={item.name}
            onClick={getRegionList}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
        <div className="content-wrapper">
          {region === "전체"
            ? allRegion?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "서울/경기권"
            ? seoul?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "대전"
            ? daejeon?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "세종"
            ? sejeong?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "인천"
            ? incheon?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "대구"
            ? daegu?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "강원도"
            ? gangwon?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "울산"
            ? ulsan?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "충청도"
            ? chungcheong?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "광주"
            ? gwangju?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "전라도"
            ? jeolla?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "부산"
            ? busan?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "경상도"
            ? gyeongsang?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : jeju?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })}
        </div>
      </div>
    </div>
  );
}
