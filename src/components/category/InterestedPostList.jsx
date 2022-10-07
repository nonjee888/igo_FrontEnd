import { useEffect,useState } from "react";
import { instance } from "../../shared/api";
import Tags from "./Tags";



// 취향 카테고리목록
export default function InterestedPostList(){
    const PostList =[]
    const [interested,setInterested] =useState('혼자여행');
    const interestedList = [

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
    const getInterestList =async () => {
      const response = await instance.get(`/api/post/interest?type=interest`);
      console.log(response)
      return response.data;
    
    };
    

  useEffect(()=> {
  getInterestList()
  },[interested]);


    return (
        <div>
            <div className="tag-wrapper">
                {interestedList.map(item => (
                    <Tags
                    key={item.name}
                    selected={interested ===item.name}
                    handler={() => setInterested(item.name)}
                    name={item.name}
                    onClick={getInterestList}
                    />
               ))}
            </div>
        </div>
    )
}