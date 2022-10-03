import { useEffect,useState } from "react";
import Tags from "../components/category/Tags";



// 취향 카테고리목록
export default function LikePostList(){
    const PostList =[]
    const [like,setLike] =useState('혼자여행');
    const likeList = [

          { name:'혼자여행',
           },

          { name:'둘이여행',
            },

          { name:'단체여행',
           },

          { name:'가성비',
           },

          { name:'럭셔리',
           },

          { name:'힐링',
           },

          { name:'액티비티',
            },

          { name:'식도락',
            },

          { name:'인스타감성',
            },
         
    ];

    useEffect(()=> {
       
    },[like]);

    return (
        <div>
            <div className="tag-wrapper">
                {likeList.map(item => (
                    <Tags
                    selected={like ===item.name}
                    handler={() => setLike(item.name)}
                    name={item.name}
                    />
               ))}
            </div>
        </div>
    )
}