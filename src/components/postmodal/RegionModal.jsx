import React,{useState, useEffect}from "react";
import SelecTags from "./SelecTags";
import { instance } from "../../shared/api";
import "./style.scss";





export default function RegionModal({closeModal}) {

    const [isChecked, setIsChecked] = useState(false); //체크여부
    const [region,setRegion] =useState({name:""});

    const regionList = [
        { name: "전체" },
        { name: "서울/경기" },
        { name: "대전" },
        { name: "세종" },
        { name: "인천" },
        { name: "대구" },
        { name: "강원도" },
        { name: "울산" },
        { name: "충청도" },
        { name: "광주" },
        { name: "전라도" },
        { name: "부산" },
        { name: "경상도" },
        { name: "제주도" },
      ];

    //   console.log(region)
    // const getRegionList =async () => {
    //     const response = await instance.post(`/api/post`);
    //     console.log(response)
    //     return response.data;
    //   };
      
  
    // useEffect(()=> {
    // getRegionList() //dispatch쓰지 않고 불러오는방법^^
    // },[region]);

    

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="conStyle">
               <SelecTags
               key={regionList.name}
               selected={region == regionList.name}
               handler={() => setRegion(regionList.name)}
               value={regionList.name}
            //    onClick={getRegionList}
               />
        </div>
        <div className="buttonbox">
                    <button className="닫기버튼" onClick={()=> closeModal(false)}>취소</button>
                    <button className="다음" onClick={()=> closeModal(false)}>다음단게</button>
                </div> 
                </div>
            </div>
      );
};
