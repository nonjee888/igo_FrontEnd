import "./style.scss";

import { useEffect, useState, useRef } from "react";
import { instance } from "../../shared/api";
import { useParams, useNavigate } from "react-router";
import { onLikePost, onReportPost } from "../../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";
import { Map, Polyline, MapMarker } from "react-kakao-maps-sdk";

import PostComment from "./PostComment";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import report from "../../asset/report.png";
import deleteimg from "../../asset/deleteimg.png";

const PostDetail = () => {
  const managerRef = useRef(null);

  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  });

  // Drawing Manager에서 가져온 데이터 중
  // 선과 다각형의 꼭지점 정보를 latlng 배열로 반환하는 함수입니다
  function pointsToPath(points) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  console.log(detail);
  const writerId = detail.nickname;
  const NICKNAME = localStorage.getItem("nickname");
  const userConfirm = NICKNAME === writerId;
  let { id } = useParams();
  useEffect(() => {
    dispatch(getDetailPosts(id));
  }, [dispatch, id]);
  if (isLoading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const onLike = async (event) => {
    event.preventDefault();
    dispatch(onLikePost(id));
    window.location.reload();
  };
  const onReport = async (event) => {
    event.preventDefault();
    dispatch(onReportPost(id));
    window.location.reload();
  };
  const onDeletePost = async (event) => {
    event.preventDefault();
    const { data } = await instance.delete(`/api/post/${id}`);
    console.log(data);
    if (data.success) alert("게시물을 삭제하시겠습니까?");
    navigate("/post/all");
  };

  return (
    <>
      <div className="allPost">
        <div className="detail-wrapper">
          <div className="detail-title">
            <h3 className="title">{detail?.title}</h3>
          </div>
          <div className="detail-btns">
            <div>
              <img />
              조회수:{detail?.viewCount}
            </div>
            <div>
              <img />
              <button onClick={onLike} className="liked-post-btn">
                <img src={heart} className="liked-post-icon" alt="관심게시글" />
              </button>
              {detail?.heartNum}
            </div>
            <div>
              <img />
            </div>
            {userConfirm ? null : (
              <button onClick={onReport} className="report-post-btn">
                <img src={report} className="report-post-icon" />
              </button>
            )}
            {userConfirm ? (
              <div>
                <button className="edit-btn">
                  <img
                    src={edit}
                    className="edit-detail-icon"
                    onClick={() => {
                      navigate("/addpost/edit/" + id);
                    }}
                  />
                </button>
                <button onClick={onDeletePost} className="delete-btn">
                  <img src={deleteimg} className="delete-icon" />
                </button>
              </div>
            ) : null}
          </div>
          <div className="tag-wrapper">태그들어감</div>

          <div
            className="html-wrapper"
            dangerouslySetInnerHTML={{ __html: detail?.content }}
          ></div>
          <div className="map-wrapper">
            <Map
              center={{
                // 지도의 중심좌표
                lat: 33.450701,
                lng: 126.570667,
              }}
              style={{
                width: "100%",
                height: "250px",
              }}
              level={3} // 지도의 확대 레벨
            ></Map>
          </div>
        </div>
        <PostComment />
      </div>
    </>
  );
};

export default PostDetail;
