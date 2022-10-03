import { useParams } from "react-router-dom";
import AllPostList from "../component/category/AllPostList";
import RegionPostList from  "../component/category/RegionPostList";
import LikePostList from  "../component/category/LikePostList";
import CostPostList from  "../component/category/CostPostList";
import Category from  "../component/category/Category";

export default function AllCategoryList() {
    const { category } = useParams();


// 카테고리 라우터
    return (
        <div>

            <Category/>

            {category === 'all' && <AllPostList/>}
            
            {category === 'region' && <RegionPostList/>}
            
            {category === 'interested' && <InterestedPostList/>}
            
            {category === 'cost' && <CostPostList/>}
            
      </div>
    )
}