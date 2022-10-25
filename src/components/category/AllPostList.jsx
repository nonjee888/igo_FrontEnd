import React, { useState, useEffect, useCallback } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import pleaseLogin from "../../asset/pleaseLogin.png";
import research from "../../asset/assetFooter/research.png";

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
    try {
      setLoading(true);
      await instance
        .get(`/api/posts/group?type=create&page=${page}`)
        .then((res) => {
          setCreate((prevState) => [...prevState, ...res.data.data]);
        });
    } catch (error) {
      return (
        <div className="All">
          <div className="sorry">
            <img
              style={{ width: "100%", height: "100%", marginBottom: "10%" }}
              src={pleaseLogin}
              alt="sorry"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            죄송합니다 다시 시도해주세요.
          </div>
        </div>
      );
    }

    setLoading(false);
  }, [page]);

  const getheart = useCallback(async () => {
    try {
      setLoading(true);
      await instance
        .get(`/api/posts/group?type=heart&page=${page}`)
        .then((res) => {
          setHeart((prevState) => [...prevState, ...res.data.data]);
        });
      setLoading(false);
    } catch (error) {
      return (
        <div className="All">
          <div className="sorry">
            <img
              style={{ width: "100%", height: "100%", marginBottom: "10%" }}
              src={pleaseLogin}
              alt="sorry"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            죄송합니다 다시 시도해주세요.
          </div>
        </div>
      );
    }
  }, [page]);

  const getView = useCallback(async () => {
    try {
      setLoading(true);
      await instance
        .get(`/api/posts/group?type=view&page=${page}`)
        .then((res) => {
          setView((prevState) => [...prevState, ...res.data.data]);
        });
      setLoading(false);
    } catch (error) {
      return (
        <div className="All">
          <div className="sorry">
            <img
              style={{ width: "100%", height: "100%", marginBottom: "10%" }}
              src={pleaseLogin}
              alt="sorry"
            />
          </div>
          <div style={{ textAlign: "center" }}>
            죄송합니다 다시 시도해주세요.
          </div>
        </div>
      );
    }
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
      </div>
      <button
        className="research1"
        onClick={() => {
          navigate("/tutorial");
        }}
      >
        <img src={research} alt="리서치커피받으세요" />
      </button>
    </div>
  );
}
