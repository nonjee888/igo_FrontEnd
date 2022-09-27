
import React, {useState} from "react";
import ReactPlayer from "react-player";
import "./style.scss";
import AddStory from "./AddStory";

//영상 불러오는 코드랑 맞춰서 집어넣어야해 내가 맡은 일중 가장 심여를 기울여보자

const VideoStory = () => {
   
        const [playIndex, setPlayIndex] = useState(0);
        const playList = [
            { index: 1, url: 'https://youtu.be/BRSARx8wEVk' },
            { index: 2, url: 'https://youtu.be/BRSARx8wEVk' },
            { index: 3, url: 'https://youtu.be/BRSARx8wEVk' }
        ];
        
        const handleNextVideo = (video, playIndex) => {
            if (playIndex === video.length - 1) {
                setPlayIndex(0);
            }
            else {
                setPlayIndex(playIndex + 1);
            }
        };
        //그니까 이 셀렉비디오를 어떻게 설정해야 하는거야 
        const selectVideo = (index) => {
            setPlayIndex(index);    
        };
        if (playList === null)
            return React.createElement("p", null, "Loading...");
        return (
            React.createElement(React.Fragment, null,
            React.createElement(ReactPlayer, 
           {url: playList[playIndex].url,
                 playing: true, 
                 //요거 컨트롤은 영상 불러오는거 가능하면 그때 죽이는걸로
                 //근데 그럼<p>태그는 어디다가 걸어쥼??
                 controls: true, 
                 muted: true, 
                 progressInterval: 1000, 
                 pip: true, 
                 onEnded: () => { handleNextVideo(playList, playIndex); }, 
                 //보여지는 영상비율인데 이건 건드리지말기 
                 width: '100%', 
                 height: '80vh'
                }))
                   
                 );
    };
  



export default VideoStory;