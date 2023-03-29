import React from "react";
import "./styles.css";
import loginImage from "../assets/winvestor_login.png";
import sideLoginImage1 from "../assets/sideImage1.png"
import sideLoginImage2 from "../assets/sideImage2.png"

function Login() {
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
                        <input className="loginInput form-control" type="text" name="Email" id="" placeholder="Email"/>
                        <input className="passwordInput form-control" type="password" name="Password" id="" placeholder="Password"/>
                        <a href="" className="recoverPasswordText">Forgot Password</a>
                        <button type="submit" className="loginButton btn btn-success">Login</button>
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
