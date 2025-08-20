import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Glicemia from "./pages/glicemia";
import Pressure from "./pages/pressure";
import Initial from "./pages/initial";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Cholesterol from "./pages/cholesterol";
import Medications from "./pages/medications";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="home" element={<Home/>}/>
        <Route path="glicemia" element={<Glicemia/>}/>
        <Route path="pressao" element={<Pressure/>}/>
        <Route path="initial" element={<Initial/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="colesterol" element={<Cholesterol/>}/>
        <Route path="medications" element={<Medications/>}/>
      </Routes>
    </Router>
  );
}

