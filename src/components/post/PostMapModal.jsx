import React from "react";
import mapmodal from "../../asset/mapmodal.png";

export default function MapModal(props) {
  const { close } = props;

  return (
    <div className="mapmodal">
      <div className="mapmodal-box">
        <img
          className="mapmodal-img"
          src={mapmodal}
          onClick={() => {
            close();
          }}
          alt=""
        />
      </div>
    </div>
  );
}
