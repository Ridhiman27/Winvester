import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';

import "./styles.css";
import loginImage from "../assets/winvestor_login.png";
import sideLoginImage1 from "../assets/sideImage1.png";
import sideLoginImage2 from "../assets/sideImage2.png";


function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert(`Successfully Signed UP!`);
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Error:${errorMessage}`);
                console.log(errorCode, errorMessage);
            });


    }

    return (
        <>
            <div className="loginComponent" >

                <div className="container loginContainer">
                    <div className="row align-items-start">
                        <div className="col-lg-10">
                            <img className="loginImage" src={loginImage} alt="" />
                        </div>
                        <div className="col-lg-2 loginTextArea" >
                            <div className="inputGroup" style={{height:"53vh",top:"-5vh"}} >
                                <h4 style={{position:"relative",top:"-3vh",fontWeight:"bold"}}>Sign Up</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" className="loginInput form-control" placeholder="First Name" style={{width:"9.5vw"}} />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="text" className="loginInput form-control" placeholder="Last Name" style={{width:"9.5vw"}} />
                                    </div>
                                </div>
                                <input className="loginInput form-control" type="email" name="Email" id="" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                <input className="passwordInput form-control" type="password" name="Password" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                <a href="" className="recoverPasswordText">Forgot Password</a>
                                <button onClick={onSubmit} type="submit" className="loginButton btn btn-success">Sign Up</button>
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

export default Signup;
