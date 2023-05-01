import React from 'react'
import { Widget } from '@typeform/embed-react';
import "./Form.css";
import { useNavigate } from "react-router-dom";
import "./landing.css"

const Form = () => {

    const navigate = useNavigate();

    return (
        <div className="">
             <input type="checkbox" id="active" />
                <label for="active" class="menu-btn"><span></span></label>
                <div class="wrapper" style={{zIndex:100}}>
                <label for="active" class="close" style={{zIndex:100}}></label>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/form">Back</a></li>
                    </ul>
                </div>
        <div className="container" style={{ height: '100vh', width: "100vw", margin: 0, padding: 0,zIndex:"-100" }}>
            <Widget id="CmqplGMn" style={{ width: '100vw', height: "100%" }} className="my-form" type="submit" />
        </div>
        </div>
    )
}

export default Form