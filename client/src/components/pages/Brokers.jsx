import axios from 'axios';
import React, { useState } from 'react';
import {useSearchParams} from "react-router-dom";

function Brokers() {
  const [code,setCode] = useState(undefined);
  const [searchParams] = useSearchParams();
  setCode(searchParams.get("code"));
  // console.log(searchParams.get("code"));

  const [token,setToken] = useState(undefined);

  // const getAccessToken = async() => {
  //   await axios.post(`https://api-v2.upstox.com/login/authorization/token`,{
  //     code:code,
  //     client_id:"dba92b3b-a6c2-4945-91f2-bddb91eedcc0",
  //     client_secret:"mep4a9ftv8",
  //     redirect_uri:"#",
  //     grant_type	: "authorization_code"
  //   })
  //   .then((response)=>setToken(response))
  //   .catch((error)=>console.log(error))

  //   console.log("token: " + token)
  // }

    // const temp = process.env.API_KEY;

    // console.log(temp);
  return (
        <>
            <h1>inside brokers page</h1>
            <a href="https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=dba92b3b-a6c2-4945-91f2-bddb91eedcc0&redirect_uri=https://vedxpatel-expert-invention-rxjr6jwp9vqcwjxp-3000.preview.app.github.dev/brokers&state=RnJpIERlYyAxNiAyMDIyIDE1OjU4OjUxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKQ%3D%3D" >Upstox</a>
            {/* <button onClick={()=>getAccessToken}>Get Access Token</button> */}
        </>
  )
}

export default Brokers