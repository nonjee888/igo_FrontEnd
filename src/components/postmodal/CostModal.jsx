import React,{useState}from "react";
import "./style.scss";




export default function CostModal({closeModal}) {

    const [isChecked, setIsChecked] = useState(false); //체크여부
    const [checkedItems,setCheackedItems]=useState({tag:""})

    const costList = [
        { id: 1, tag: "10만원대" },
        { id: 2, tag: "20만원대" },
        { id: 3, tag: "30만원대" },
        { id: 4, tag: "30만원이상" },
     
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
            {costList.map((item) => (
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