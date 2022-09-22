
import React, {useState} from "react";
import ReactPlayer from "react-player/lazy";
import "./style.scss";


const TravelStory = () => {
   
        const [playIndex, setPlayIndex] = useState(0);
        const playList = [
            { index: 1, url: '' },
            { index: 2, url: 'https://youtu.be/BTPbJ6TqpTQ' },
            { index: 3, url: 'http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8' }
        ];
        
        const handleNextVideo = (video, playIndex) => {
            if (playIndex === video.length - 1) {
                setPlayIndex(0);
            }
            else {
                setPlayIndex(playIndex + 1);
            }
        };
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
                 controls: true, 
                 muted: true, 
                 progressInterval: 1000, 
                 pip: true, 
                 onEnded: () => { handleNextVideo(playList, playIndex); }, 
                 width: '100%', 
                 height: '80vh'
                }))
                   
                 );
    };
  



export default TravelStory;