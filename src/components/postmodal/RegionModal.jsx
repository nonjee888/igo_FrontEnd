import React,{useState}from "react";
import "./style.scss";




export default function RegionModal({closeModal}) {

    const [isChecked, setIsChecked] = useState(false); //체크여부
    const [checkedItems,setCheackedItems]=useState({tag:""})

    const regionList = [
        { id: 1, tag: "전체" },
        { id: 2, tag: "서울/경기" },
        { id: 3, tag: "대전" },
        { id: 4, tag: "세종" },
        { id: 5, tag: "인천" },
        { id: 6, tag: "대구" },
        { id: 7, tag: "강원도" },
        { id: 8, tag: "울산" },
        { id: 9, tag: "충청도" },
        { id: 10, tag: "광주" },
        { id: 11, tag: "전라도" },
        { id: 12, tag: "부산" },
        { id: 13, tag: "경상도" },
        { id: 14, tag: "제주도" },
      ];

      const changeHandler = (e)=> {
        const { name, value } = e.target;
         if(isChecked) {
            setCheackedItems(checkedItems);
          } 
        console.log(e.target.value)
        setIsChecked(!isChecked);
        setCheackedItems({tag:e.target.value})
      
        };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="conStyle">
            {regionList.map((item) => (
           <label key={item.tag}>
             <input
             type="checkbox"
             style={{display:"none",}}
             value={item.tag}
             onChange={changeHandler}
            />
           <div>{item.tag}</div>
          </label>
         ))}
        </div>
        <div className="buttonbox">
                    <button className="닫기버튼" onClick={()=> closeModal(false)}>취소</button>
                    <button className="다음" onClick={()=> closeModal(false)}>다음단게</button>
                </div> 
                </div>
            </div>
      );
};