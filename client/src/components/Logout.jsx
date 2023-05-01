import React, { useEffect } from 'react';
import "./landing.css";
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import {auth} from '../Firebase';


function Logout() {

    const navigate = useNavigate();
 
    useEffect(() => {
        signOut(auth).then(() => {
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            alert(error.message)
        });
    },[])           

    return (
        <>

        </>
    )
}

export default Logout
