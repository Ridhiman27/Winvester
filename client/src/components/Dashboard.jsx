import React, { useEffect, useState } from 'react';
import "./dashboard.css";
import TradingView from "./TradingView";
import RiskMeter from './dashComponents/RiskMeter.jsx';
import axios from "axios";
import { useFormAction, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();



const Dashboard = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(undefined);
  const [email, setEmail] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let tempEmail = user.email;
        setEmail(String(tempEmail));
        // const uid = user.uid;
        // ...

      } else {
        alert(`Login to get personalized data`);
        navigate("/login")
      }

    });

    const fetchData = async () => {
      try {
        const response = await axios.get("https://script.google.com/macros/s/AKfycbwNDH8iTJl6LT-bEp16QMWfADiGqSWpH9ZbEpuL76IswiafUQ424BC5Jtjk5134E7K_bw/exec");
        setFormData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();


    const searchEmail = () => {
      for (let i = 1; i < formData.length; i++) {
        if (formData[i][8] == email) {
          setMainIndex(i);
        }
      }
    }
    if (formData != undefined) { searchEmail(); };

    const calculateRiskScore = () => {

      // Assign risk values to questions
      const riskValues = {
        secureIncome: {
          "Very Stable": 10,
          "Stable": 15,
          "Somewhat Stable": 20,
          "Unstable": 25,
          "Very Unstable": 30
        },
        // financiallyDependent: {
        //   0: 10,
        //   1: 20,
        //   2: 30
        // },
        emiAllocation: {
          "None": 10,
          "Less than 10": 15,
          "10 -20": 20,
          "20 -30": 25,
          "Above 30": 30,
          // lessThan25Percent: 10,
          // between25And50Percent: 20,
          // moreThan50Percent: 30
        },
        stockInvestmentPreference: {
          "Buy more of the investment": 30,
          "Hold onto the investment and sell nothing": 20,
          "Sell a portion of the remaining investment": 15,
          "Sell all of the remaining investment": 10,
          // sellAll: 10,
          // holdAndMonitor: 20,
          // buyMore: 30
        },
        investmentHorizon: {
          shortTerm: 10,
          mediumTerm: 20,
          longTerm: 30
        },
        riskAppetite: {
          "Strongly Agree": 30,
          "Agree": 25,
          "Neutral": 20,
          "Disagree": 15,
          "Strongly Disagree": 10
        },
        portfolioAllocation: {
          "Savings account and fixed deposits": 10,
          "Bonds": 15,
          "Equities or Mutual Funds": 25,
          "Real Estate": 15,
        },
        investmentAmount: {
          lessThan10k: 10,
          between10kAnd50k: 20,
          moreThan50k: 30
        }
      };

      const financiallyDependent = () => {
        if (formData[mainIndex][2] == 0) {
          return 10;
        } else if (formData[mainIndex][2] < 5 && formData[mainIndex][2] > 0) {
          return 20;
        } else {
          return 30;
        }
      }

      const investmentHorizon = () => {
        if (formData[mainIndex][5] <= 3) {
          return 10;
        } else if (formData[mainIndex][5] >= 4 && formData[mainIndex][5] <= 7) {
          return 20;
        } else {
          return 30;
        }
      }

      // Calculate risk score
      // const tempScore = riskValues.secureIncome[formData[mainIndex][0]]
      //   + riskValues.emiAllocation[formData[mainIndex][2]]
      //   + riskValues.stockInvestmentPreference[formData[mainIndex][3]]
      //   + riskValues.riskAppetite[formData[mainIndex][5]]
      //   + riskValues.portfolioAllocation[formData[mainIndex][6]]
      //   + financiallyDependent + investmentHorizon;
      // setRiskScore(tempScore);
      // Return risk score
      
      // return riskScore;
    }

    calculateRiskScore();

  }, [])





  // Call the function to calculate the risk score
  // const riskScore = calculateRiskScore();

  // // Log the risk score to the console




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
                    {/* <svg width="222" height="129" viewBox="0 0 222 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M221.378 40.4027C203.194 21.9097 180.061 9.10042 154.903 3.59464C129.745 -1.91114 103.693 0.133886 80.0415 9.47111C56.3897 18.8083 36.2002 35.0184 22.0263 56.0514C7.85231 77.0844 0.330487 101.996 0.411971 127.635L44.4793 128.518C44.4255 111.596 49.3899 95.1546 58.7447 81.2728C68.0995 67.391 81.4245 56.6924 97.0348 50.5298C112.645 44.3673 129.839 43.0176 146.443 46.6514C163.048 50.2852 178.316 58.7393 190.317 70.9447L221.378 40.4027Z" fill="#FCED2F" />
                    </svg> */}
                    <div className="container" style={{ height: "20vh" }}>
                      <RiskMeter value={75} />
                    </div>
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
              <div className="row" style={{ height: "40vh", marginTop: "3vh" }}>
                <div className="col-md-auto tradingView" style={{ width: "53vw", height: "40vh" }}>
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