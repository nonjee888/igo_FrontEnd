import { useEffect,useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";



// 지역 카테고리목록
export default function RegionPostList() {
    
    const postList = []
    const [region,setRegion] =useState('전체');
    const regionList = [
        {
            name:'전체',
        },
        {
            name:'서울/경기권',
        },
        {
            name:'강원도',
        },
        {
            name:'충청도',
        },
        {
            name:'전라도',
        },
        {
            name:'경상도',
        },
        {
            name:'제주도',
        },
    ];

    const getRegionList =async () => {
        const response = await instance.get(`/api/post/region?type=region`);
        console.log(response)
        return response.data;
      };
      
  
    useEffect(()=> {
    getRegionList() //dispatch쓰지 않고 불러오는방법^^
    },[region]);

    

    return (
        <div>
            <div className="tag-wrapper">
                {regionList.map(item => (
                   <Tags
                   key={item.name}
                   selected={region === item.name}
                   handler={() => setRegion(item.name)}
                   name={item.name}
                   onClick={getRegionList}
                   />
                ))}
            </div>
        </div>
    )
}