
import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";

//전체 (대)카테고리목록
export default function Category () {

  const navigate = useNavigate();
  const path = useParams();
  const categoryList = [
     { name : '전체',
      path : 'all',},

      { name : '지역',
      path : 'region',},

      { name : '관심사',
      path : 'like',},

      { name : '가격',
      path : 'cost',},
  ];
  return(
    <div>
      <div className="category-wrapper">

      {categoryList.map(item =>(
        <p
        className="catagory-head"
        style={path.category ===item.path? { fontWeight: 700, color:'#000'} : {}}
        onClick={()=>navigate('/post/'+ item.path )}> {/*대카테고리선택시 해당하는 카테고리로 이동*/}
          {item.name}{path.category === item.path && '+'}
        </p>
        ))}

        <div className="search-icon">
         {/* <img className="searchicon"/> */}
        </div>
      </div>

    </div>
  );
}
