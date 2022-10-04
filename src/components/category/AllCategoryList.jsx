import { useParams } from "react-router-dom";
import AllPostList from "./AllPostList";

import InterestedPostList from  "./InterestedPostList";
import CostPostList from  "./CostPostList";
import Category from  "./Category";
import RegionPostList from "./RegionPostList";

export default function AllCategoryList() {
    const { category } = useParams();


// 카테고리 라우터
    return (
        <div>

            {/* <Category/> */}

            {category === 'all' && <AllPostList/>}
            
            {category === 'region' && <RegionPostList/>}
            
            {category === 'interested' && <InterestedPostList/>}
            
            {category === 'cost' && <CostPostList/>}
            
      </div>
    )
}