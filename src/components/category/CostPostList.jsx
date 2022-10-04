import { useEffect,useState } from "react";
import Tags from "./Tags";


// 가격 카테고리목록
export default function CostPostList() {
    const postList = [] 
    const [cost,setCost] = useState(1);
    const costList = [
        {
            name:'10만원대',
            value:1,
        },
        {
            name:'20만원대',
            value:2,
        },
        {
            name:'30만원대',
            value:3,
        },
        {
            name:'30만원이상',
            value:4,
        }
    ]

    useEffect(()=> {
    
    },[cost]);


return (
    <div>
        <div className="tag-wrapper">
            {costList.map(item => (
                
                <Tags
                key={item.name}
                selected={cost === item.value} //Tags 프롭스에서 selected는 아이템이름과 같은지 안같은지 판단
                handler={() => setCost(item.value)}
                name={item.name}
           
            />
            ))}
            </div>
        </div>
           
      )
    }