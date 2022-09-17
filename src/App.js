import "./App.css";
import Router from "./shared/Router";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
        <title>🚌🚕💸 내돈내여 💸🚗🚆</title>
      </Helmet>
      <div className="App">
        <Router />
      </div>
    </>
  );
}

export default App;
