import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import pleaseLogin from "../../asset/pleaseLogin.png";
import Tags from "./Tags";
import Post from "../post/Post";

// 지역 카테고리목록
export default function RegionPostList() {
  const [region, setRegion] = useState("전체");
  const [postList, setPostList] = useState();

  const regionList = [
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

  let seoul =
    postList &&
    postList?.filter((post) => {
      return region === "서울/경기권";
    });

  let daejeon =
    postList &&
    postList?.filter((post) => {
      return region === "대전";
    });

  let sejeong =
    postList &&
    postList?.filter((post) => {
      return region === "세종";
    });

  let incheon =
    postList &&
    postList?.filter((post) => {
      return region === "인천";
    });

  let daegu =
    postList &&
    postList?.filter((post) => {
      return region === "대구";
    });

  let gangwon =
    postList &&
    postList?.filter((post) => {
      return region === "강원도";
    });

  let ulsan =
    postList &&
    postList?.filter((post) => {
      return region === "울산";
    });

  let chungcheong =
    postList &&
    postList?.filter((post) => {
      return region === "충청도";
    });

  let gwangju =
    postList &&
    postList?.filter((post) => {
      return region === "광주";
    });

  let jeolla =
    postList &&
    postList?.filter((post) => {
      return region === "전라도";
    });

  let busan =
    postList &&
    postList?.filter((post) => {
      return region === "부산";
    });

  let gyeongsang =
    postList &&
    postList?.filter((post) => {
      return region === "경상도";
    });

  let jeju =
    postList &&
    postList?.filter((post) => {
      return region === "제주도";
    });

  //-----------------지역별분류-------------------//

  const getRegionList = async () => {
    try {
      const response = await instance.get(`/api/posts/region?type=${region}`);
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
    getRegionList(); //dispatch쓰지 않고 불러오는방법^^
  }, [region]);

  return (
    <div className="postListAll">
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
          {region === "서울/경기권"
            ? seoul &&
              seoul?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "대전"
            ? daejeon &&
              daejeon?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "세종"
            ? sejeong &&
              sejeong?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "인천"
            ? incheon &&
              incheon?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "대구"
            ? daegu &&
              daegu?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "강원도"
            ? gangwon &&
              gangwon?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "울산"
            ? ulsan &&
              ulsan?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "충청도"
            ? chungcheong &&
              chungcheong?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "광주"
            ? gwangju &&
              gwangju?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "전라도"
            ? jeolla &&
              jeolla?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "부산"
            ? busan &&
              busan?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : region === "경상도"
            ? gyeongsang &&
              gyeongsang?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })
            : jeju &&
              jeju?.map((post) => {
                return (
                  <Post post={post} key={post.id} createdAt={post.createdAt} />
                );
              })}
        </div>
      </div>
    </div>
  );
}
