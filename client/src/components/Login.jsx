import React, {useState} from "react";
import "./styles.css";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../Firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import loginImage from "../assets/winvestor_login.png";
import sideLoginImage1 from "../assets/sideImage1.png"
import sideLoginImage2 from "../assets/sideImage2.png"

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert(`Successfully Logged In!`);
            console.log(user);
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error:${errorMessage}`);
            console.log(errorCode, errorMessage)
        });
       
    }


    return (
        <>
            <div className="loginComponent">

            <div className="container loginContainer">
                <div className="row align-items-start">
                    <div className="col-lg-10">
                        <img className="loginImage" src={loginImage} alt="" />
                    </div>
                    <div className="col-lg-2 loginTextArea">
                        <div className="inputGroup">
                        <h4 style={{position:"relative",top:"-3vh",fontWeight:"bold"}}>Login</h4>
                        <input className="loginInput form-control" type="email" name="Email" id="" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                        <input className="passwordInput form-control" type="password" name="Password" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                        <a href="" className="recoverPasswordText">Forgot Password</a>
                        <button onClick={onLogin} type="submit" className="loginButton btn btn-success">Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <img src={sideLoginImage1} alt="" className="sideImage1" />
            <img src={sideLoginImage2} alt="" className="sideImage2" />
            </div>
        </>
    );
}

export default Login;
