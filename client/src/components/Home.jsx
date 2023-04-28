import React from "react";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import home4 from "../assets/home4.png";
import home5 from "../assets/home5.png";
import "./landing.css";
import Navbar from "./Navbar"

const Home = () => {
    return (
        <div className="home-container">
           <Navbar/>
            <div className="container1">
                <img src={home1} alt="" className="home1" />
            </div>
            <div className="container2" style={{ paddingTop: "20vh" }}>
                <img src={home2} alt="" className="home2" />
            </div>
            <div className="container3">
                <img src={home3} alt="" className="home3" />
            </div>
            <div className="container4">
                <img src={home4} alt="" className="home4" />
            </div>
            <div className="container5">
                <img src={home5} alt="" className="home5" />
            </div>
        </div>
    )
}

export default Home;