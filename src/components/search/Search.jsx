import "./style.scss";
import Swal from "sweetalert2";
import Post from "../post/Post";
import search from "../../asset/search.png";
import pleaseLogin from "../../asset/pleaseLogin.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../redux/modules/posts";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      dispatch(searchPosts(searchTerm));
      navigate("/search/" + value);
    }
  };

  const getSearchTerm = () => {
    if (searchTerm === "") {
      new Swal({
        title: "키워드를 입력해주세요!",
        icon: "warning",
        closeOnClickOutside: false,
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
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
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
