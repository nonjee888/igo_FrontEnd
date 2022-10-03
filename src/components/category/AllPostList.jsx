import { useEffect,useState} from "react";
import Tags from "./Tags";



// ~순 카테고리목록
export default function AllPostList () {

const postList = []

const [sort,setSort] = useState('create');
const [status,setStatus] = useState(false);
const sortList = [
    {
        name:'create',
        value:'최신순' ,
    },
    {
        name:'like',
        value: '좋아요순',
    },
    {
        name:'view',
        value: '조회순',
    },
] 
useEffect(()=> {
    
},{sort});

return (
    <div>
        <div className="tag-wrapper">
            {sortList.map(item => (
                <Tags
                key={item.name}
                selected={sort === item.name}
                handler={()=> setSort(item.name)}
                name={item.value}
                />
            ))}
        </div>
        <div className="post-list-wrapper">
                    {postList.map(item => (
                        <div/>
                    ))}
       </div>             
    </div>
)
}


