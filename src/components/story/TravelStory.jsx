
import React, {useState} from "react";
import ReactPlayer from "react-player";
import "./style.scss";


const TravelStory = () => {
     const VideoPlayer = ({ title, vodPlaylistId }) => {
        const [playIndex, setPlayIndex] = useState(0);
        const playList = [
            { index: 1, url: 'https://tv.kakao.com/v/432153145' },
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
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null, "Player Test"),
            React.createElement(ReactPlayer, 
            { url: playList[playIndex].url,
                 playing: true, 
                 controls: true, 
                 muted: true, 
                 progressInterval: 1000, 
                 pip: true, 
                 onEnded: () => { handleNextVideo(playList, playIndex); }, 
                 width: '100%', 
                 height: '80px' })));
    };
  

}

export default TravelStory;