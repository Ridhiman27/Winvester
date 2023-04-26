import React from 'react';
import "./dashboard.css";
import TradingView from "./TradingView";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
        <div className="row">
          <div className="col-md-auto">
            <div className="left-navigation">

            </div>
          </div>
          <div className="col-md-auto" style={{ width: "54vw" }}>
            <h1 style={{ color: "white" }}>Dashboard</h1>
            <div className="container" style={{ position: "absolute", width: "54vw" }}>
              <div className="row">
                <div className="col-md-auto" >
                  <div className="container" style={{ background: "#2A2A2D", minHeight: "27vh", minWidth: "25vw", borderRadius: "20px" }}>
                    <h5 style={{ color: "white" }}>Risk Appetite</h5>
                    <svg width="222" height="129" viewBox="0 0 222 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M221.378 40.4027C203.194 21.9097 180.061 9.10042 154.903 3.59464C129.745 -1.91114 103.693 0.133886 80.0415 9.47111C56.3897 18.8083 36.2002 35.0184 22.0263 56.0514C7.85231 77.0844 0.330487 101.996 0.411971 127.635L44.4793 128.518C44.4255 111.596 49.3899 95.1546 58.7447 81.2728C68.0995 67.391 81.4245 56.6924 97.0348 50.5298C112.645 44.3673 129.839 43.0176 146.443 46.6514C163.048 50.2852 178.316 58.7393 190.317 70.9447L221.378 40.4027Z" fill="#FCED2F" />
                    </svg>

                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="container" style={{ background: "#2A2A2D", minHeight: "27vh", minWidth: "25vw", borderRadius: "20px" }}>
                    <h5 style={{ color: "white" }}>Currencies</h5>

                  </div>
                </div>
              </div>
              {/* <div className="row" style={{marginTop:"3vh"}}>
                <div className="col-md-auto">
                <div className="container" style={{ background: "#2A2A2D", minHeight: "20vh", minWidth: "17vw", borderRadius: "20px" }}>
                    <h5 style={{ color: "white" }}>Risk Appetite</h5>
                  </div>
                </div>
              </div> */}
              <div className="row" style={{height:"40vh",marginTop:"3vh"}}>
                <div className="col-md-auto tradingView" style={{width:"53vw",height:"40vh"}}>
                  <TradingView />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-auto">
            <h3 style={{ color: "white" }}>Ridhiman</h3>
            <div className="assets-container" style={{ marginTop: "3vh" }}>
              <h3 style={{ color: "white" }}>Assets</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard