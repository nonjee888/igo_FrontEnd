import "./style.scss";
import Swal from "sweetalert2";
import Post from "../post/Post";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../redux/modules/posts";

import search from "../../asset/search.png";
import igoLogo from "../../asset/igoLogo.png";
import pleaseLogin from "../../asset/pleaseLogin.png";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const searchEnter = (e) => {
    //이벤트의 키 값이 엔터키와 일치할 때 다음을 실행한다
    if (searchTerm && e.key === "Enter") {
      const value = e.target.value;
      dispatch(searchPosts(searchTerm));
      navigate("/search/" + value);
    }
  };

  const getSearchTerm = () => {
    //검색어가 공란인 채로 온클릭 이벤트 실행 안됨
    if (searchTerm === "") {
      new Swal({
        title: "키워드를 입력해주세요!",
        icon: "warning",
      });
      return;
    }
    dispatch(searchPosts(searchTerm)).then((res) => {
      navigate("/search/" + searchTerm);
    });
  };

  const { isLoading, error, posts } = useSelector((state) => state?.posts);

  useEffect(() => {
    dispatch(searchPosts(searchTerm));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="All">
        <img
          src={igoLogo}
          style={{ width: "50%", margin: "80% 25% 0 25%", display: "block" }}
          alt="스피너"
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="All">
        <div className="sorry">
          <img
            style={{ width: "100%", height: "100%", marginBottom: "10%" }}
            src={pleaseLogin}
            alt="sorry"
          />
        </div>
        <div style={{ textAlign: "center" }}>죄송합니다 다시 시도해주세요.</div>
      </div>
    );
  }

  return (
    <>
      <div className="All">
        <div className="input-wrapper">
          <input
            type="search"
            className="SearchBar"
            name="content"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyPress={(e) => searchEnter(e)}
          />
          <button className="search-btn" onClick={getSearchTerm}>
            <img className="Icon" src={search} alt="search" />
          </button>
        </div>
        {posts.length === 0 ? (
          <div className="no-result">
            <img className="noResult-img" src={pleaseLogin} />
            일치하는 검색결과가 없습니다.
          </div>
        ) : (
          <div className="search-wrapper">
            {posts &&
              posts?.map((post) => {
                return <Post post={post} key={post.id} />;
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
