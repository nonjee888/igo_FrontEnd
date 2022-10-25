//카카오 맵
import { Map, MapMarker, DrawingManager, Polyline } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/api";
import { useEffect, useState, useRef } from "react";
import PostMapModal from "./PostMapModal";
import Swal from "sweetalert2";

import learnMore from "../../asset/learnMore.png";
import goback from "../../asset/goback.png";
import editpost from "../../asset/editpost.png";

const { kakao } = window;

const PostKakaoMap = (props) => {
  const navigate = useNavigate();
  const managerRef = useRef(null);
  const id = props.props.id;
  const overlayData = props.props.overlayData;
  const setOverlayData = props.props.setOverlayData;
  const isEdit = props.props.isEdit;
  const isActive = props.props.isActive;
  const checkedItems = props.props.checkedItems;

  const [modalOpen, setModalOpen] = useState(false);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isDone, setIsDone] = useState(false);

  //게시물 등록시 서버로 전송될 데이터
  const title = props.props.data.title; //타이틀
  const content = props.props.data.editor; //에디터
  const mapData = overlayData; //맵데이터
  const searchPlace = props.searchPlace; //키워드검색
  const tags = props.props.data.tags; //tag선택

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRegisterButton = async () => {
    if (
      checkedItems.cost === "비용 선택" ||
      checkedItems.interest === "관심사 선택" ||
      checkedItems.region === "지역 선택"
    ) {
      Swal.fire({
        icon: "error",
        text: "태그를 모두 선택 해주세요!",
        confirmButtonColor: "#47AFDB",
        confirmButtonText: "확인",
      });
    } else {
      let req = {
        title: title,
        content: content,
        mapData: overlayData,
        searchPlace: searchPlace,
        tags: tags,
      };

      const data = await instance.post("/api/post", req);

      if (data.data.success) {
        navigate("/post/all");
      }
    }
  };

  const handleEditButton = async () => {
    let req = {
      title: title,
      content: content,
      mapData: mapData,
      searchPlace: searchPlace,
      tags: tags,
    };

    const data = await instance.patch(`/api/post/${id}`, req, {
      headers: { "content-type": "application/json" },
    });
    if (data.data.success) {
      navigate("/post/all");
    }
  };

  const selectOverlay = (type) => {
    const manager = managerRef.current;
    manager.cancel();
    manager.select(type);
  };
  // Drawing Manager에서 가져온 데이터 중
  // 선과 다각형의 꼭지점 정보를 latlng 배열로 반환하는 함수입니다

  const drawOverlayData = () => {
    const manager = managerRef.current;
    setOverlayData(manager.getData());
  };

  const pointsToPath = (points) => {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    if (props.searchPlace === "") return;

    ps.keywordSearch(props.searchPlace, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, props.searchPlace]);

  return (
    <>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "230px",
        }}
        level={3}
        onCreate={setMap}
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

        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
        <DrawingManager
          ref={managerRef}
          drawingMode={[
            kakao.maps.drawing.OverlayType.MARKER,
            kakao.maps.drawing.OverlayType.POLYLINE,
          ]}
          guideTooltip={["draw", "drag", "edit"]}
          markerOptions={{
            // 마커 옵션입니다
            draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
            removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
          }}
          polylineOptions={{
            // 선 옵션입니다
            draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
            removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
            editable: true, // 그린 후 수정할 수 있도록 설정합니다
            strokeColor: "#39f", // 선 색
            hintStrokeStyle: "dash", // 그리중 마우스를 따라다니는 보조선의 선 스타일
            hintStrokeOpacity: 0.5, // 그리중 마우스를 따라다니는 보조선의 투명도
          }}
        />
      </Map>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <button
          className="지도버튼"
          onClick={(e) => {
            selectOverlay(kakao.maps.drawing.OverlayType.POLYLINE);
          }}
        >
          여행경로
        </button>

        <button
          className="지도버튼"
          onClick={(e) => {
            selectOverlay(kakao.maps.drawing.OverlayType.MARKER);
          }}
        >
          출발지 | 도착지
        </button>
        {isEdit ? (
          <button
            className="지도버튼"
            onClick={() => {
              drawOverlayData();
              setIsDone(true);
              Swal.fire({
                text: "여행경로 수정이 완료되었습니다",
                confirmButtonColor: "#47AFDB",
                confirmButtonText: "확인",
              });
            }}
          >
            {isDone ? "경로업데이트" : "여행경로수정"}
          </button>
        ) : (
          <button
            className="지도버튼"
            onClick={() => {
              drawOverlayData();
              Swal.fire({
                text: "여행경로 등록이 완료되었습니다",
                confirmButtonColor: "#47AFDB",
                confirmButtonText: "확인",
              });
            }}
          >
            여행코스저장
          </button>
        )}
        <button className="map-modal-btn" onClick={openModal}>
          <img className="map-info" src={learnMore} />
        </button>
        {modalOpen ? (
          <PostMapModal postId={id} open={modalOpen} close={closeModal} />
        ) : null}
      </div>

      <div className="footer">
        <button
          className="goback-post"
          onClick={() => {
            navigate("/post/all");
          }}
        >
          <img className="goback-icon" src={goback} alt="뒤로" />
        </button>
        {isEdit ? (
          <button
            className="edit-post"
            onClick={() => {
              handleEditButton();
            }}
          >
            <img className="edit-icon" src={editpost} alt="수정" />
          </button>
        ) : isActive ? (
          <button
            type="submit"
            disabled={content.length > 8 && title.length >= 2 ? false : true}
            className="submit-post"
            onClick={() => {
              handleRegisterButton();
            }}
          >
            게시물 등록
          </button>
        ) : (
          <button
            type="submit"
            disabled={content.length > 8 && title.length >= 2 ? false : true}
            className="noSubmit-post"
            onClick={() => {
              handleRegisterButton();
            }}
          >
            게시물 등록
          </button>
        )}
      </div>
    </>
  );
};

export default PostKakaoMap;
