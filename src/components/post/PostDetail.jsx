import "./style.scss";

import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { instance } from "../../shared/api";
import { useParams, useNavigate } from "react-router";
import { onLikePost } from "../../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";

import { Map, Polyline, MapMarker } from "react-kakao-maps-sdk";
import PostReportModal from "./PostReportModal";
import Swal from "sweetalert2";
import dompurify from "dompurify";
import PostComment from "./PostComment";
import goingback from "../../asset/goingback.png";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import report from "../../asset/report.png";
import list from "../../asset/list.png";
import deleteimg from "../../asset/deleteimg.png";
import pleaseLogin from "../../asset/pleaseLogin.png";

const { kakao } = window;

const PostDetail = () => {
  const { id } = useParams();
  const { error, detail } = useSelector((state) => state?.posts);
  const { myinfo } = useSelector((state) => state.myinfo);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [viewCount, setViewCount] = useState();
  const [heartNum, setHeartNum] = useState();
  const [tags, setTags] = useState();

  const [center, setCenter] = useState();
  const [poly, setPoly] = useState();
  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  });

  //신고하기 모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    Swal.fire({
      imageUrl: report,
      imageWidth: 50,
      imageHeight: 50,
      text: "신고 하시겠습니까?",
      showCancelButton: true,
      cancelButtonColor: "#D9D9D9",
      confirmButtonColor: "#47AFDB",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalOpen(true);
      } else if (result.isDenied) {
        return;
      }
    });
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const sanitizer = dompurify.sanitize;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const writerId = detail.nickname;
  const user = myinfo && myinfo[0]?.nickname;
  const userConfirm = user === writerId;

  const mapRef = useRef();
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    if (center?.length === 0 && poly[0]?.points.length !== 0) {
      poly &&
        poly[0]?.points?.forEach((point) => {
          bounds.extend(new kakao.maps.LatLng(point.y, point.x));
        });
    } else {
      center &&
        center?.forEach((point) => {
          bounds.extend(new kakao.maps.LatLng(point.y, point.x));
        });
    }
    return bounds;
  }, [center]);

  useEffect(() => {
    setTimeout(() => {
      const map = mapRef.current;
      if (bounds && map) map.setBounds(bounds && bounds);
    }, 50);
  }, [center]);

  function pointsToPath(points) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }

  useLayoutEffect(() => {
    if (id !== undefined) {
      dispatch(getDetailPosts(id)).then((response) => {
        setTitle(response.payload.title);
        setContent(response.payload.content);
        setViewCount(response.payload.viewCount);
        setHeartNum(response.payload.heartNum);
        setTags(response && response?.payload?.tags);
        setOverlayData(response.payload.mapData);
        setCenter(response.payload.mapData.marker);
        setPoly(response.payload.mapData.polyline);
      });
    }
    return () => {
      setTitle("");
      setContent();
      setViewCount("");
      setHeartNum("");
      setTags([]);
    };
  }, []);

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

  const onLike = async (event) => {
    event.preventDefault();
    dispatch(onLikePost(id));
  };

  const onDeletePost = async (id) => {
    const { data } = await instance.delete(`/api/post/${id}`);
    if (data.success) {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="allPost">
        <div className="detail-wrapper">
          <div className="detail-title">
            <div className="title">
              <div className="goBackwrap">
                <img
                  style={{
                    width: "40%",
                    height: "40%",
                    float: "left",
                    marginLeft: "10px",
                  }}
                  src={goingback}
                  onClick={() => {
                    navigate(-1);
                  }}
                  alt=""
                />
              </div>
              {title}
            </div>
          </div>
          {/* 비회원: 작성자, 조회수 보임 like, report 누르면 로그인하기 alert*/}
          {!user ? (
            <div className="noUser-detail-btns">
              <h4 className="detail-nickname">{writerId}</h4>
              <div>조회수:{viewCount}</div>
              <div className="heart-num">
                <button
                  className="liked-post-btn"
                  onClick={() => {
                    Swal.fire({
                      showCancelButton: true,
                      imageUrl: pleaseLogin,
                      imageWidth: 200,
                      imageHeight: 100,
                      text: "로그인이 필요합니다",
                      confirmButtonColor: "#47AFDB",
                      confirmButtonText: "로그인",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/");
                      } else if (result.isDenied) {
                        return null;
                      }
                    });
                  }}
                >
                  <img
                    src={heart}
                    className="liked-post-icon"
                    alt="관심게시글"
                  />
                </button>
                <div className="number">{heartNum}</div>
              </div>
              <button
                className="report-post-btn"
                onClick={() => {
                  Swal.fire({
                    showCancelButton: true,
                    imageUrl: pleaseLogin,
                    imageWidth: 200,
                    imageHeight: 100,
                    text: "로그인이 필요합니다",
                    confirmButtonColor: "#47AFDB",
                    confirmButtonText: "로그인",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/");
                    } else if (result.isDenied) {
                      return null;
                    }
                  });
                }}
              >
                <img
                  src={report}
                  className="report-post-icon"
                  alt="신고버튼"
                  loading="lazy"
                />
              </button>
            </div>
          ) : !userConfirm ? (
            /* 회원 && !게시글 작성자 ? like, report 가능 */
            <div className="notMy-detail-btns">
              <h4 className="detail-nickname">{writerId}</h4>
              <div>조회수:{viewCount}</div>

              <div className="heart-num">
                <button onClick={onLike} className="liked-post-btn">
                  <img
                    src={heart}
                    className="liked-post-icon"
                    alt="관심게시글"
                  />
                </button>
                <div className="number">{heartNum}</div>
              </div>

              <button onClick={openModal} className="report-post-btn">
                <img
                  src={report}
                  className="report-post-icon"
                  alt="신고버튼"
                  loading="lazy"
                />
              </button>
              {modalOpen ? (
                <PostReportModal
                  postId={id}
                  open={modalOpen}
                  close={closeModal}
                />
              ) : null}
            </div>
          ) : (
            /* 게시글 작성자 : like, edit, delete 가능 */
            <div className="detail-btns">
              <h4 className="detail-nickname">{writerId}</h4>
              <div>조회수:{viewCount}</div>

              <div className="heart-num">
                <button onClick={onLike} className="liked-post-btn">
                  <img
                    src={heart}
                    className="liked-post-icon"
                    alt="관심게시글"
                  />
                </button>
                <div className="number">{heartNum}</div>
              </div>
              <div className="edit-delete">
                <button className="edit-btn">
                  <img
                    src={edit}
                    className="edit-detail-icon"
                    onClick={() => {
                      navigate("/addpost/edit/" + id);
                    }}
                    alt=""
                  />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    Swal.fire({
                      showCancelButton: true,
                      imageUrl: list,
                      imageWidth: 50,
                      imageHeight: 50,
                      text: "게시글을 삭제할까요?",
                      confirmButtonColor: "#47AFDB",
                      cancelButtonColor: "#D9D9D9",
                      confirmButtonText: "확인",
                      cancelButtonText: "취소",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onDeletePost(id);
                      } else if (result.isDenied) {
                        window.location.reload();
                      }
                    });
                  }}
                >
                  <img
                    src={deleteimg}
                    className="delete-icon"
                    alt="신고버튼"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          )}

          {/*태그*/}
          <div className="tag-wrapper">
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="detail-tag-text" style={{ color: "#fff" }}>
                {tags && tags[0]}
              </span>
            </div>
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="detail-tag-text" style={{ color: "#fff" }}>
                {tags && tags[1]}
              </span>
            </div>
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="detail-tag-text" style={{ color: "#fff" }}>
                {tags && tags[2]}
              </span>
            </div>
          </div>
          {/*태그*/}

          <div
            className="html-wrapper"
            dangerouslySetInnerHTML={{ __html: sanitizer(content) }}
          ></div>
          <div className="map-wrapper">
            {center === undefined && poly === undefined ? (
              <> </>
            ) : center?.length === 0 && poly?.length === 0 ? (
              <> </>
            ) : (
              <>
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

export default React.memo(PostDetail);
