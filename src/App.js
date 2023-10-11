import React from "react";
import "./App.css";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Days from "./Components/Days";
import History from "./Components/History";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/days" element={<Days />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
