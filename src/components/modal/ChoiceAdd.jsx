import React from "react";
import { navigate, useNavigate } from "react-router-dom";
import "./style.scss";
import TripIcon from "../../asset/tripcomm.png";
import VodIcon from "../../asset/videocomm.png";

const ChoiceAdd = ({ close }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="show-Choicemodal">
        <div className="Check-Modal">
          <img
            className="btn-choiceModal"
            src={VodIcon}
            onClick={() => {
              navigate("/addstory");
            }}
          ></img>
          <img
            className="btn-choiceModal"
            src={TripIcon}
            onClick={() => {
              navigate("/addpost");
            }}
          ></img>
          <div>
            <button
              className="btn-close"
              onClick={() => {
                close();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceAdd;
