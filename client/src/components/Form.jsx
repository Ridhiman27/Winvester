import React from 'react'
import { Widget } from '@typeform/embed-react';
import "./Form.css"

const Form = () => {
    return(
        <div className="container" style={{height:'100vh',width:"100vw",margin:0,padding:0}}>
            <Widget id="rox36zkk" style={{ width: '100vw',height:"100%" }} className="my-form" />
        </div>
    )
}

export default Form