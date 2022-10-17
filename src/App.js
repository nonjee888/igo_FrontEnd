import "./App.css";
import "./style.scss";
import Router from "./shared/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="mobile-wrapper">
          <Router />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
