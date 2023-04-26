import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <>
      <Router >
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="/form" element={<Form/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App