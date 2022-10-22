import "./style.scss";

import { useEffect, useState, useMemo, useRef } from "react";
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

  const fetch = async () => {
    try {
      const { data } = await instance.get(`/api/detail/${id}`);

      setCenter(data?.data?.mapData?.marker);
      setPoly(data?.data?.mapData?.polyline);
    } catch (error) {
      <div className="All" style={{ marginLeft: "10%" }}>
        <img
          style={{ width: "100%", height: "100%", marginBottom: "10%" }}
          src={pleaseLogin}
        />
        죄송합니다 다시 시도해주세요.
      </div>;
    }
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

  if (error) {
    return (
      <div className="All" style={{ marginLeft: "10%" }}>
        <img
          style={{ width: "100%", height: "100%", marginBottom: "10%" }}
          src={pleaseLogin}
        />
        죄송합니다 다시 시도해주세요.
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
            <div className="title">{detail?.title}</div>
          </div>
          {/* 비회원: 작성자, 조회수 보임 like, report 누르면 로그인하기 alert*/}
          {!user ? (
            <div className="noUser-detail-btns">
              <h4 className="detail-nickname">{writerId}</h4>
              <div>조회수:{detail?.viewCount}</div>
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
                <div className="number">{detail?.heartNum}</div>
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
                <img src={report} className="report-post-icon" />
              </button>
            </div>
          ) : !userConfirm ? (
            /* 회원 && !게시글 작성자 ? like, report 가능 */
            <div className="notMy-detail-btns">
              <h4 className="detail-nickname">{writerId}</h4>
              <div>조회수:{detail?.viewCount}</div>

              <div className="heart-num">
                <button onClick={onLike} className="liked-post-btn">
                  <img
                    src={heart}
                    className="liked-post-icon"
                    alt="관심게시글"
                  />
                </button>
                <div className="number">{detail?.heartNum}</div>
              </div>

              <button onClick={openModal} className="report-post-btn">
                <img src={report} className="report-post-icon" />
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
              <div>조회수:{detail?.viewCount}</div>

              <div className="heart-num">
                <button onClick={onLike} className="liked-post-btn">
                  <img
                    src={heart}
                    className="liked-post-icon"
                    alt="관심게시글"
                  />
                </button>
                <div className="number">{detail?.heartNum}</div>
              </div>
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
                  <img src={deleteimg} className="delete-icon" />
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
                {detail?.tags[0]}
              </span>
            </div>
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="detail-tag-text" style={{ color: "#fff" }}>
                {detail?.tags[1]}
              </span>
            </div>
            <div
              className="tag"
              style={{
                background: `linear-gradient(to right, #F5C9E0 30%,#47AFDB) 70%`,
              }}
            >
              <span className="detail-tag-text" style={{ color: "#fff" }}>
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
