import React, { Children } from "react"; //여기서 말하는 칠드런은 ?
import "./style.scss";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState(); //영상파일에 대한 useState

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="All">
    <div className="VideoInput">
      <input className="title"></input>
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4" //불러올수 있는 파일형식
      />
      {!source && <button onClick={handleChoose}>Choose</button>} 
      {source && ( 
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls //요거 죽이면 밑에 재생 일시정지 소리 등 안보임,영상업로드취소하는 버튼 만들기
          src={source}
        />
      )}
      
      
      
    </div>
     {/* {영상 저장해서 보내줘야 하는데 이거 어케함?} */}
    
    
    
    </div>

    
  );
}
