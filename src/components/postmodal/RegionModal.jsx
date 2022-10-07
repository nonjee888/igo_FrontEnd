import React,{useState}from "react";
import "./style.scss";




export default function RegionModal({closeModal}) {

    const [isChecked, setIsChecked] = useState(false); //체크여부
    const [checkedItems,setCheckedItems]=useState({tag:""})

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
            setCheckedItems(checkedItems);
          } 
          if (checkedItems.size > 1) {
            checkedItems.delete();
            setCheckedItems(checkedItems);
            e.preventDefault();
            window.alert("최대 3개까지 선택가능합니다");
          } else {
        setIsChecked(!isChecked);
        setCheckedItems({tag:e.target.value})
    }
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
