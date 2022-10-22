
import React from "react";
import mapmodal from "../../asset/mapmodal.png";

export default function MapModal (close) {
    const {close} = props;

    return (
        <div>
            <img className="mapmodal" src={mapmodal} onClick={()=>{close}}></img>
        </div>
    )
}