import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Glicemia from "./pages/glicemia";
import Pressure from "./pages/pressure";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="glicemia" element={<Glicemia />}/>
        <Route path="pressao" element={<Pressure />}/>
      </Routes>
    </Router>
  );
}

