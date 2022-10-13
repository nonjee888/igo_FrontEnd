import "./style.scss";

import { useEffect, useState, useMemo, useRef } from "react";
import { instance } from "../../shared/api";
import { useParams, useNavigate } from "react-router";
import { onLikePost } from "../../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";

import { Map, Polyline, MapMarker } from "react-kakao-maps-sdk";
import Swal from "sweetalert2";
import dompurify from "dompurify";
import PostComment from "./PostComment";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import report from "../../asset/report.png";
import listIcon from "../../asset/assetFooter/listIcon.png";
import deleteimg from "../../asset/deleteimg.png";

const { kakao } = window;

const PostDetail = () => {
  const { id } = useParams();
  const { isLoading, error, detail } = useSelector((state) => state?.posts);

  const [user, setUser] = useState();
  const [center, setCenter] = useState();
  const [poly, setPoly] = useState();
  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  });

  const sanitizer = dompurify.sanitize;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const writerId = detail.nickname;
  const userConfirm = user === writerId;

  const fetch = async () => {
    const { data } = await instance.get(`/api/detail/${id}`);

    setCenter(data?.data?.mapData?.marker);
    setPoly(data?.data?.mapData?.polyline);
    setUser(data?.data?.nickname);
  };

  useEffect(() => {
    fetch();
  }, []);

  const mapRef = useRef();
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    if (center?.length === 0 && poly[0]?.points.length !== 0) {
      poly[0]?.points?.forEach((point) => {
        bounds.extend(new kakao.maps.LatLng(point.y, point.x));
      });
    } else {
      center?.forEach((point) => {
        bounds.extend(new kakao.maps.LatLng(point.y, point.x));
      });
    }
    return bounds;
  }, [center, poly]);

  function pointsToPath(points) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getDetailPosts(id)).then((response) => {
        setOverlayData(response.payload.mapData);
      });
    }
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
  };

  const onReport = async (id) => {
    const data = await instance.post(`/api/report/${id}`, {});

    if (data.data.success === true) {
      Swal.fire({
        imageUrl: listIcon,
        imageWidth: 50,
        imageHeight: 50,
        text: "신고완료!",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      }).then((result) => {
        navigate("/post/all");
      });
      navigate("/post/all");
    } else {
      if (data.data.success === false) {
        Swal.fire({
          imageUrl: listIcon,
          imageWidth: 50,
          imageHeight: 50,
          text: "이미 신고한 게시물입니다.",
          confirmButtonColor: "#47AFDB",
          confirmButtonText: "확인",
        }).then((result) => {
          navigate("/post/all");
        });
        return data.data;
      }
    }
  };

  const onDeletePost = async (id) => {
    const { data } = await instance.delete(`/api/post/${id}`);
    if (data.success) {
      navigate("/post/all");
    }
  };

  return (
    <>
      <div className="allPost">
        <div className="detail-wrapper">
          <div className="detail-title">
            <div className="title">{detail?.title}</div>
          </div>
          <div className="detail-btns">
            <h4 className="detail-nickname">{writerId}</h4>
            <div>조회수:{detail?.viewCount}</div>
            <div className="heart-num">
              <button onClick={onLike} className="liked-post-btn">
                <img src={heart} className="liked-post-icon" alt="관심게시글" />
              </button>
              <p>{detail?.heartNum}</p>
            </div>

            {userConfirm ? null : (
              <button
                onClick={() => {
                  onReport(id);
                }}
                className="report-post-btn"
              >
                <img src={report} className="report-post-icon" />
              </button>
            )}
            {userConfirm ? (
              <div className="edit-delete">
                <button className="edit-btn">
                  <img
                    src={edit}
                    className="edit-detail-icon"
                    onClick={() => {
                      navigate("/addpost/edit/" + id);
                    }}
                  />
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      showCancelButton: true,
                      imageUrl: listIcon,
                      imageWidth: 50,
                      imageHeight: 50,
                      text: "게시글을 삭제할까요?",
                      confirmButtonColor: "#47AFDB",
                      confirmButtonText: "삭제 확인",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onDeletePost(id);
                      } else if (result.isDenied) {
                        window.location.reload();
                      }
                    });
                  }}
                  className="delete-btn"
                >
                  <img src={deleteimg} className="delete-icon" />
                </button>
              </div>
            ) : null}
          </div>
          {/*태그*/}
          <div className="tag-wrapper">
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="tag-text" style={{ color: "#fff" }}>
                {detail?.tags[0]}
              </span>
            </div>
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="tag-text" style={{ color: "#fff" }}>
                {detail?.tags[1]}
              </span>
            </div>
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="tag-text" style={{ color: "#fff" }}>
                {detail?.tags[2]}
              </span>
            </div>
          </div>
          {/*태그*/}

          <div
            className="html-wrapper"
            dangerouslySetInnerHTML={{ __html: sanitizer(detail?.content) }}
          ></div>
          <div className="map-wrapper">
            {center === undefined && poly === undefined ? (
              <> {detail.nickname}님은 경로를 공유하지 않았습니다. </>
            ) : center?.length === 0 && poly?.length === 0 ? (
              <> {detail.nickname}님은 경로를 공유하지 않았습니다. </>
            ) : (
              <>
                <button
                  className="map-detail"
                  onClick={() => {
                    const map = mapRef.current;
                    if (map) map.setBounds(bounds);
                  }}
                >
                  눌러서경로보기
                </button>
                <Map // 지도를 표시할 Container
                  center={{
                    // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                  }}
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                  level={4} // 지도의 확대 레벨
                  ref={mapRef}
                >
                  {center?.map((point) => (
                    <MapMarker
                      key={`${point.y}-${point.x}`}
                      position={{ lat: point.y, lng: point.x }}
                    />
                  ))}

                  {overlayData.polyline.map(({ points, options }, i) => (
                    <Polyline
                      key={i}
                      path={pointsToPath(points)}
                      {...options}
                    />
                  ))}
                </Map>
              </>
            )}
          </div>
        </div>
        <PostComment />
      </div>
    </>
  );
};

export default PostDetail;
