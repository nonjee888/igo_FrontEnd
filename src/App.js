import "./App.css";
import "./style.scss";
import Router from "./shared/Router";

import background from "./asset/background.png";

function App() {
  return (
    <>
      <img
        className="webImg"
        src={background}
        loading="lazy"
        alt="background"
      />
      <div className="mobile-wrapper">
        <Router />
      </div>
    </>
  );
}

export default App;
