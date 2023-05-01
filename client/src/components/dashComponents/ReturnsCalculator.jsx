import React, { useState } from 'react';
import "./risk.scss"
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button
} from '@chakra-ui/react'

function ReturnsCalculator({ data }) {


    const [initialInvestment, setInitialInvestment] = useState(0);
    const [investmentRange, setInvestmentRange] = useState(0);
    const [returns, setReturns] = useState(0);


    const calculateReturns = () => {
        const totalInvestment = initialInvestment * Math.pow((1 + (returns / 100)), investmentRange);
        const compoundInterestReturns = totalInvestment - initialInvestment;
        data(Math.ceil(compoundInterestReturns),Math.ceil(totalInvestment),returns);
      };
      


    const [sliderValue1, setSliderValue1] = useState(100000);
    const [sliderValue2, setSliderValue2] = useState(5);
    const [sliderValue3, setSliderValue3] = useState(10);

    return (
        <div>
            <div className="container" style={{ position: "relative", top: "1.5vh", left: "1vw" }}>
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-md-auto" style={{ color: "white", width: "100%" }}>
                        <FormControl style={{ width: "25vw" }}>
                            <FormLabel style={{ marginBottom: "5vh", fontSize: "18px" }} htmlFor="initialInvestment">Initial Investment:</FormLabel>
                            <Slider aria-label='slider-ex-1' colorScheme="yellow" defaultValue={100000} min={1000} max={1000000} onChange={(val) => { setSliderValue1(val); setInitialInvestment(val) }} style={{ marginBottom: "3vh" }}>
                                <SliderMark
                                    value={sliderValue1}
                                    textAlign='center'
                                    bg='yellow.800'
                                    color='white'
                                    mt='-10'
                                    ml='-35'
                                    w='20'
                                >
                                    {sliderValue1}
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <FormLabel style={{ marginBottom: "5vh", fontSize: "18px" }} htmlFor="investmentRange">Investment Range:</FormLabel>
                            <Slider aria-label='slider-ex-1' colorScheme="yellow" defaultValue={5} min={0} max={30} onChange={(val) => { setSliderValue2(val); setInvestmentRange(val) }} style={{ marginBottom: "3vh" }}>
                                <SliderMark
                                    value={sliderValue2}
                                    textAlign='center'
                                    bg='yellow.800'
                                    color='white'
                                    mt='-10'
                                    ml='-35'
                                    w='20'
                                >
                                    {sliderValue2} Yrs
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                            {/* <input type="number" id="investmentRange" value={investmentRange[0]} onChange={handleInvestmentRangeChange} /> */}
                            {/* <input type="number" id="investmentRange" value={investmentRange[1]} onChange={handleInvestmentRangeChange} /> */}

                            <FormLabel style={{ marginBottom: "5vh", fontSize: "18px" }} htmlFor="stockReturns">Stock or MF Returns (%):</FormLabel>
                            <Slider aria-label='slider-ex-1' colorScheme="yellow" defaultValue={10} min={1} max={50} onChange={(val) => { setSliderValue3(val); setReturns(val) }} style={{ marginBottom: "7vh" }}>
                                <SliderMark
                                    value={sliderValue3}
                                    textAlign='center'
                                    bg='yellow.800'
                                    color='white'
                                    mt='-10'
                                    ml='-35'
                                    w='20'
                                >
                                    {sliderValue3} %
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                            <Button colorScheme='yellow' style={{ marginTop: "3vh", alignSelf: "center", backgroundColor: "#FCED2F", color: "black" }} onClick={calculateReturns}>Calculate</Button>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReturnsCalculator;
