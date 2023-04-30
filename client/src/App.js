import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css"
import Login from "./components/Login";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard.jsx";
import RiskAppetite from "./components/pages/RiskAppetite.jsx";
import Home from "./components/Home.jsx";
import Signup from './components/Signup';


function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="/form" element={<Form/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/risk-appetite" element={<RiskAppetite/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App