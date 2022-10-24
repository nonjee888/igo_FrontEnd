import "./App.css";
import "./style.scss";
import Router from "./shared/Router";
import { BrowserRouter } from "react-router-dom";
import background from "./asset/background.png";

function App() {
  return (
    <>
      <BrowserRouter>
        <img className="webImg" src={background} />
        <div className="mobile-wrapper">
          <Router />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
