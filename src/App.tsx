import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>test</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
