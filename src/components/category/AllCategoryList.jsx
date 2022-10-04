import { useParams } from "react-router-dom";
import AllPostList from "./AllPostList";

import InterestedPostList from  "./InterestedPostList";
import CostPostList from  "./CostPostList";
import Category from  "./Category";
import RegionPostList from "./RegionPostList";
import Headers from "../layout/Headers";
import Footers from "../layout/Footers";

export default function AllCategoryList() {
    const { category } = useParams();


// 카테고리 라우터
    return (
        <div>
<Headers/>
           <Category/>

            {category === 'all' && <AllPostList/>}
            
            {category === 'region' && <RegionPostList/>}
            
            {category === 'interested' && <InterestedPostList/>}
            
            {category === 'cost' && <CostPostList/>}
            <Footers/>
      </div>
    )
}