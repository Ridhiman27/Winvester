import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <>
      <Router >
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/form" element={<Form/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App