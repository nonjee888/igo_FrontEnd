import "./App.css";
import "./style.scss";
import Router from "./shared/Router";
import { BrowserRouter } from "react-router-dom";
import webImg from "./asset/backImg.png";

function App() {
  return (
    <>
    
      <BrowserRouter>
      <img className="webImg" src={webImg}/>
        <div className="mobile-wrapper">
          <Router />
        </div>
      </BrowserRouter>
     
    </>
  );
}

export default App;
