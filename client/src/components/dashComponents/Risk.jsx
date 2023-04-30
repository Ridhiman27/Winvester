import React from 'react'
import "./risk.scss"

function Risk({percentage}) {

  // const [percent,setPercent] = React.useState(0);
  // setPercent(percentage);

  return (
    <>
      {/* <div className="semi-donut- margin" style={{ "--percentage": 80, "--fill": "#FF3D00" }}>
        HTML5
      </div> */}
      <div className="semi-donut-model-2 margin" style={{ "--percentage": percentage, "--fill": "#FCED2F" }}>
        <h1 style={{color:"white",fontWeight:"bold"}}>
        {percentage} %
        </h1>
      </div>
      {/* <div className="multi-graph margin">
        JavaScript
        <div className="graph" data-name="jQuery" style={{ "--percentage": 80, "--fill": "#0669AD" }}>
        </div>
        <div className="graph" data-name="Angular" style={{ "--percentage": 60, "--fill": "#E62A39" }}>
        </div>
        <div className="graph" data-name="React" style={{ "--percentage": 30, "--fill": "#FEDA3E" }}>
        </div>
      </div> */}
    </>
  )
}

export default Risk