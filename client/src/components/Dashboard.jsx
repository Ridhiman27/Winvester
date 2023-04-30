import React, { useEffect, useState } from 'react';
import "./dashboard.scss";
import TradingView from "./TradingView";
import RiskMeter from './dashComponents/RiskMeter.jsx';
import axios from "axios";
import { useFormAction, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import Navbar from './Navbar';
import { Spinner } from "@chakra-ui/spinner"
import { RadialChart } from 'react-vis';
import Pie from "./dashComponents/Pie";
import Risk from "./dashComponents/Risk"
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { Wrap, WrapItem } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { NseIndia } from  "stock-nse-india";
const  nseIndia = new  NseIndia()


const auth = getAuth();



const Dashboard = () => {

  // realtime stock data
  
  nseIndia.getAllStockSymbols().then(symbols  => {
    console.log(symbols)
  })
  // realtime stock data

  const navigate = useNavigate();

  const [formData, setFormData] = useState(undefined);
  const [email, setEmail] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);
  const [riskScoreLoading, setRiskScoreLoading] = useState(false);
  const [pieData, setPieData] = useState({});
  const [pieDataLoading, setPieDataLoading] = useState(true);
  const [pieChartData, setPieChartData] = useState([]);
  // alert
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  // alert

  // const myData = [{angle: 33}, {angle: 33}, {angle: 33}]

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let tempEmail = user.email;
        setEmail(String(tempEmail));
        // const uid = user.uid;
        // ...

      } else {
        onOpen();

      }

    });

    const fetchData = async () => {
      try {
        const response = await axios.get("https://script.google.com/macros/s/AKfycbwNDH8iTJl6LT-bEp16QMWfADiGqSWpH9ZbEpuL76IswiafUQ424BC5Jtjk5134E7K_bw/exec");
        setFormData(response.data.data);
        await axios.get("https://vedxpatel-improved-robot-x4j9pjxv6xwh5x9-5000.preview.app.github.dev/risk-calculation")
          .then(async (response) => {
            console.log(`Portfolio segregated: ${response.data}`);
            // setPieData(response.data);
            setPieDataLoading(false);
            // let pieResponse = await axios.get("https://vedxpatel-improved-robot-x4j9pjxv6xwh5x9-5000.preview.app.github.dev/pie")
            // console.log(`Pie Chart Data: ${pieResponse.data}`)

            // PIE CHART DATA 
            let temp = response.data
            let tempPieData = {}
            for (let i = 0; i < temp.length; i++) {
              let inputString = temp[i]
              const parseString = (str) => {
                const pairs = str.split(",");
                const result = {};

                for (let i = 0; i < pairs.length; i++) {
                  const [key, value] = pairs[i].split(":");
                  result[key.trim()] = parseFloat(value) || 0;
                }
                Object.assign(tempPieData, result)
                return result;
              }

              const dataObj = parseString(inputString);
              // console.log(dataObj);
            }
            console.log(tempPieData)

            if (tempPieData["Mutual Funds"] < 15) { tempPieData["Mutual Funds"] = 15; tempPieData["Stock"] -= 15; }
            setPieData(tempPieData)
            setPieChartData([
              {
                "id": "stock",
                "label": "stocks",
                "value": tempPieData["Stock"],
                "color": "hsl(66, 70%, 50%)"
              },
              {
                "id": "mutual funds",
                "label": "mutual funds",
                "value": tempPieData["Mutual Funds"],
                "color": "hsl(79, 70%, 50%)"
              },
              {
                "id": "gold",
                "label": "gold",
                "value": tempPieData["GOLD"],
                "color": "hsl(264, 70%, 50%)"
              },
              {
                "id": "etf",
                "label": "etf",
                "value": 0,
                "color": "hsl(265, 70%, 50%)"
              },
              {
                "id": "government schemes",
                "label": "government schemes",
                "value": 0,
                "color": "hsl(270, 70%, 50%)"
              }])
            // PIE CHART DATA 


          })
          .catch((error) => console.error(error))

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, [])





  useEffect(() => {
    if (formData && formData.length) {
      for (let i = 1; i < formData.length; i++) {
        if (formData[i][8] == email) {
          setMainIndex(i);
        }
      }
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
        // investmentAmount: {
        //   lessThan10k: 10,
        //   between10kAnd50k: 20,
        //   moreThan50k: 30
        // }
      };

      let financiallyDependent;
      if (formData[mainIndex][2] == 0) {
        financiallyDependent = 10;
      } else if (formData[mainIndex][2] < 5 && formData[mainIndex][2] > 0) {
        financiallyDependent = 20;
      } else {
        financiallyDependent = 30;
      }

      let investmentHorizon;
      if (formData[mainIndex][5] <= 3) {
        investmentHorizon = 10;
      } else if (formData[mainIndex][5] >= 4 && formData[mainIndex][5] <= 7) {
        investmentHorizon = 20;
      } else {
        investmentHorizon = 30;
      }

      // Calculate risk score
      const tempScore = riskValues.secureIncome[formData[mainIndex][1]]
        + riskValues.emiAllocation[formData[mainIndex][3]]
        + riskValues.stockInvestmentPreference[formData[mainIndex][4]]
        + riskValues.riskAppetite[formData[mainIndex][6]]
        + riskValues.portfolioAllocation[formData[mainIndex][7]]
        + financiallyDependent + investmentHorizon;

      let refactor = (tempScore / 210) * 100;

      setRiskScore(Math.ceil(refactor));
      // // Return risk score
      console.log(riskScore);
      setRiskScoreLoading(true);
    }
  }, [formData])





  return (
    <div className="dashboard-container">

      {/* alert dialog box chakra */}
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Login</AlertDialogHeader>
          <AlertDialogCloseButton onClick={() => navigate("/login")} />
          <AlertDialogBody>
            Login to get personalized data !
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='green' ml={3} onClick={() => navigate("/login")}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* alert dialog box chakra */}

      <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
        <div className="row">
          <div className="col-md-auto">
            <div className="left-navigation">

            </div>
          </div>
          <div className="col-md-auto" style={{ width: "54vw" }}>
            <h3 style={{ color: "white",marginBottom:"5vh",color: "white",position:"relative",top:"1.5vh" }}>Dashboard</h3>
            <div className="container" style={{ position: "absolute", width: "54vw" }}>
              <div className="row">
                <div className="col-md-auto" >
                  <div className="container" style={{ background: "#2A2A2D", minHeight: "27vh", minWidth: "25vw", borderRadius: "20px" }}>
                    <h4 style={{ color: "white",position:"relative",top:"1.5vh",left:"1.5vw" }}>Risk Appetite</h4>
                    {/* <svg width="222" height="129" viewBox="0 0 222 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M221.378 40.4027C203.194 21.9097 180.061 9.10042 154.903 3.59464C129.745 -1.91114 103.693 0.133886 80.0415 9.47111C56.3897 18.8083 36.2002 35.0184 22.0263 56.0514C7.85231 77.0844 0.330487 101.996 0.411971 127.635L44.4793 128.518C44.4255 111.596 49.3899 95.1546 58.7447 81.2728C68.0995 67.391 81.4245 56.6924 97.0348 50.5298C112.645 44.3673 129.839 43.0176 146.443 46.6514C163.048 50.2852 178.316 58.7393 190.317 70.9447L221.378 40.4027Z" fill="#FCED2F" />
                    </svg> */}
                    <div className="container" style={{ height: "20vh",alignItems:"center" }}>
                      {
                        riskScoreLoading === false ? (
                          <div className="" style={{ position: "relative", top: "40%", left: "45%" }}>
                            <Spinner size='xl' color='blue' />
                          </div>
                        ) :
                          (
                            <>
                              {/* <Risk /> */}
                              {/* <h5 style={{ color: "white" }}>Winvestor Risk Score: {riskScore}</h5> */}
                              <div className="container" style={{paddingTop:"5vh",paddingLeft:"13%"}}>
                              <Risk percentage={riskScore} />
                              </div>
                            </>
                          )
                      }
                      {/* <ArcGauge value={30} /> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-auto">
                  <div className="container" style={{ background: "#2A2A2D", minHeight: "27vh", minWidth: "25vw", borderRadius: "20px" }}>
                    <h4 style={{ color: "white",position:"relative",top:"1.5vh",left:"1.5vw" }}>Currencies</h4>

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
            <h3 style={{ color: "white",marginBottom:"5vh" }}>Ridhiman</h3>
            <div className="assets-container" style={{ marginTop: "3vh" }}>
              <h4 style={{ color: "white",position:"relative",top:"1.5vh",left:"1.5vw" }}>Assets</h4>
              <ul >
                {
                  pieDataLoading ?
                    (
                      <div className="" style={{ position: "relative", top: "40%", left: "45%" }}>
                        <Spinner size='xl' color='blue' />
                      </div>
                    )
                    :
                    (
                      <>
                        <div className="container" style={{ height: "40vh" }}>
                          <Pie data={pieChartData} />
                        </div>
                        <Wrap>
                          {
                            Object.keys(pieData).map((keyName, i) => (
                              <WrapItem>
                                <Stat key={i} style={{ color: "white",marginRight:"2vw" }} >
                                  <StatLabel>{keyName}</StatLabel>
                                  <StatNumber>{pieData[keyName]} %</StatNumber>
                                </Stat>
                              </WrapItem>
                            ))
                          }
                        </Wrap>

                        {/* {pieData.map((data) => {
                          return (
                            <Stat>
                              <StatLabel>{data}</StatLabel>
                              <StatNumber>£0.00</StatNumber>
                            </Stat>
                          )
                        })} */}
                      </>
                    )
                }
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard