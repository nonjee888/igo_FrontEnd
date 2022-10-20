import React, { useState, useEffect, useCallback } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// ~순 카테고리목록
export default function AllPostList() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("create");
  //데이터를 계속 담을 State
  const [create, setCreate] = useState([]);
  const [heart, setHeart] = useState([]);
  const [view, setView] = useState([]);
  //스크롤이 닿았을 때 2>3>4 등 페이지를 바꿀 State
  const [page, setPage] = useState(0);
  //로딩 성공,실패 담을 State
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const sortList = [
    {
      name: "create",
      value: "최신순",
    },
    {
      name: "heart",
      value: "좋아요순",
    },
    {
      name: "view",
      value: "조회순",
    },
  ];

  const getCreate = useCallback(async () => {
    setLoading(true);
    await instance
      .get(`/api/posts/group?type=create&page=${page}`)
      .then((res) => {
        setCreate((prevState) => [...prevState, ...res.data.data]);
      });

    setLoading(false);
  }, [page]);

  const getheart = useCallback(async () => {
    setLoading(true);
    await instance
      .get(`/api/posts/group?type=heart&page=${page}`)
      .then((res) => {
        setHeart((prevState) => [...prevState, ...res.data.data]);
      });
    setLoading(false);
  }, [page]);

  const getView = useCallback(async () => {
    setLoading(true);
    await instance
      .get(`/api/posts/group?type=view&page=${page}`)
      .then((res) => {
        setView((prevState) => [...prevState, ...res.data.data]);
      });
    setLoading(false);
  }, [page]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getCreate();
  }, [getCreate]);

  useEffect(() => {
    getheart();
  }, [getheart]);

  useEffect(() => {
    getView();
  }, [getView]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page+=1
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView]);

  return (
    <div className="postListAll">
      <div className="tag-wrapper">
        {sortList.map((item) => (
          <Tags
            key={item.name}
            selected={sort === item.name}
            handler={() => setSort(item.name)}
            name={item.value}
            onClick={() => {}}
          />
        ))}
      </div>
      <div className="post-list-wrapper">
        <div className="content-wrapper">
          {" "}
          {sort === "create"
            ? create &&
              create?.map((post, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {create.length - 1 == idx ? (
                      <>
                        <div className="post-wrapper" ref={ref}>
                          <PostCard post={post} key={post.id} />
                        </div>
                      </>
                    ) : (
                      <div className="post-wrapper">
                        <PostCard post={post} key={post.id} />
                        <div />
                      </div>
                    )}
                  </React.Fragment>
                );
              })
            : sort === "heart"
            ? heart &&
              heart?.map((post, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {heart.length - 1 == idx ? (
                      <>
                        <div className="post-wrapper" ref={ref}>
                          <PostCard post={post} key={post.id} />
                        </div>
                      </>
                    ) : (
                      <div className="post-wrapper">
                        <PostCard post={post} key={post.id} />
                        <div />
                      </div>
                    )}
                  </React.Fragment>
                );
              })
            : view &&
              view?.map((post, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {view.length - 1 == idx ? (
                      <div className="post-wrapper" ref={ref}>
                        <PostCard post={post} key={post.id} />
                      </div>
                    ) : (
                      <div className="post-wrapper">
                        <PostCard post={post} key={post.id} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
        </div>

        <button
          className="research"
          onClick={() => {
            navigate("/tutorial");
          }}
        >
          튜토리얼보고 커피받기
        </button>
      </div>
    </div>
  );
}
