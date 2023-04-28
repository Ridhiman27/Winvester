import React from 'react';
import "./landing.css";
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import {auth} from '../Firebase';

export default function Navbar() {

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            
        });
    }

    return (
        <>
            <input type="checkbox" id="active" />
            <label for="active" class="menu-btn"><span></span></label>
            <label for="active" class="close"></label>
            <div class="wrapper">
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/form">Form</a></li>
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
        </>
    )
}
