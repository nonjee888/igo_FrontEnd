import "./style.scss";

import { useEffect, useState } from "react";
import { instance } from "../../shared/api";
import { useParams, useNavigate } from "react-router";
import { onLikePost } from "../../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPosts } from "../../redux/modules/posts";

import { Map, Polyline, MapMarker } from "react-kakao-maps-sdk";
import Swal from "sweetalert2";

import PostComment from "./PostComment";
import heart from "../../asset/heart.png";
import edit from "../../asset/edit.png";
import report from "../../asset/report.png";
import listIcon from "../../asset/assetFooter/listIcon.png";
import deleteimg from "../../asset/deleteimg.png";

const { kakao } = window;

const PostDetail = ({ props }) => {
  const { id } = useParams();
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  const overlayData = props?.overlayData;
  const setOverlayData = props?.setOverlayData;

  const [center, setCenter] = useState();
  const [poly, setPoly] = useState();

  function pointsToPath(points) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }

  const fetch = async () => {
    const { data } = await instance.get(`/api/detail/${id}`);
    setCenter(data?.data?.mapData?.marker);
    setPoly(data?.data?.mapData?.polyline);
  };

  useEffect(() => {
    fetch();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const writerId = detail.nickname;
  const NICKNAME = localStorage.getItem("nickname");
  const userConfirm = NICKNAME === writerId;

  useEffect(() => {
    //수정하기 할때 예전에 넣은 맵데이터 보임. 근데 수정이 안됨. 뺄까 말까 고민중
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
    console.log(data);
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
  console.log(center?.length === 0 && poly[0]?.points.length !== 0);
  return (
    <>
      <div className="allPost">
        <div className="detail-wrapper">
          <div className="detail-title">
            <h3 className="title">{detail?.title}</h3>
          </div>
          <div className="detail-btns">
            <h4>{writerId}</h4>
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
          <div className="tag-wrapper">태그들어감</div>

          <div
            className="html-wrapper"
            dangerouslySetInnerHTML={{ __html: detail?.content }}
          ></div>

          {center?.length === 0 && poly[0]?.points.length === 0 ? (
            <div className="map-wrapper">
              <span style={{ color: "blue" }}>
                {NICKNAME}님이 입력한 위치 정보가 없습니다.
              </span>
              <Map // 로드뷰를 표시할 Container
                center={{
                  lat: 37.566826,
                  lng: 126.9786567,
                }}
                style={{
                  width: "100%",
                  height: "300px",
                }}
                level={14}
              >
                {overlayData.polyline.map(({ points, options }, i) => (
                  <Polyline key={i} path={pointsToPath(points)} {...options} />
                ))}

                {overlayData.marker.map(({ x, y, zIndex }, i) => (
                  <MapMarker
                    key={i}
                    position={{
                      lat: y,
                      lng: x,
                    }}
                    zIndex={zIndex}
                  />
                ))}
              </Map>
            </div>
          ) : center?.length === 0 && poly[0]?.points.length !== 0 ? (
            <div className="map-wrapper">
              <Map // 로드뷰를 표시할 Container
                center={{
                  lat: poly[0]?.points[0]?.y,
                  lng: poly[0]?.points[0]?.x,
                }}
                style={{
                  width: "100%",
                  height: "300px",
                }}
                level={4}
              >
                {overlayData.polyline.map(({ points, options }, i) => (
                  <Polyline key={i} path={pointsToPath(points)} {...options} />
                ))}

                {overlayData.marker.map(({ x, y, zIndex }, i) => (
                  <MapMarker
                    key={i}
                    position={{
                      lat: y,
                      lng: x,
                    }}
                    zIndex={zIndex}
                  />
                ))}
              </Map>
            </div>
          ) : center ||
            poly[0]?.points ||
            (center && poly[0]?.points === undefined) ? (
            <div className="map-wrapper">
              <Map // 로드뷰를 표시할 Container
                center={{
                  lat: 37.566826,
                  lng: 126.9786567,
                }}
                style={{
                  width: "100%",
                  height: "200px",
                }}
                level={14}
              >
                {overlayData.polyline.map(({ points, options }, i) => (
                  <Polyline key={i} path={pointsToPath(points)} {...options} />
                ))}

                {overlayData.marker.map(({ x, y, zIndex }, i) => (
                  <MapMarker
                    key={i}
                    position={{
                      lat: y,
                      lng: x,
                    }}
                    zIndex={zIndex}
                  />
                ))}
              </Map>
            </div>
          ) : (
            <div className="map-wrapper">
              <Map // 로드뷰를 표시할 Container
                center={{
                  lat: center[0]?.y || "",
                  lng: center[0]?.x || "",
                }}
                style={{
                  width: "100%",
                  height: "300px",
                }}
                level={1}
              >
                {overlayData.polyline.map(({ points, options }, i) => (
                  <Polyline key={i} path={pointsToPath(points)} {...options} />
                ))}

                {overlayData.marker.map(({ x, y, zIndex }, i) => (
                  <MapMarker
                    key={i}
                    position={{
                      lat: y,
                      lng: x,
                    }}
                    zIndex={zIndex}
                  />
                ))}
              </Map>
            </div>
          )}
        </div>
      </div>
      <PostComment />
    </>
  );
};

export default PostDetail;
