import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css"
import Login from "./components/Login";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard.jsx";
import RiskAppetite from "./components/pages/RiskAppetite.jsx";
import Suggestions from "./components/pages/Suggestions.jsx";
import Recommendations from "./components/pages/Recommendations.jsx";
import Home from "./components/Home.jsx";
import Signup from './components/Signup';
import Logout from './components/Logout';
import Prediction from './components/pages/Prediction';
import PredictionMF from './components/pages/PredictionMF';
import Brokers from './components/pages/Brokers';


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
            <Route path="/suggestions" element={<Suggestions/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/recommendations" element={<Recommendations/>} />
            <Route path="/prediction" element={<Prediction/>} />
            <Route path="/predictionMF" element={<PredictionMF/>} />
            <Route path="/brokers" element={<Brokers/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App