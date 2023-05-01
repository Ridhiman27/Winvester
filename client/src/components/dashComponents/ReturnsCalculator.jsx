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
} from '@chakra-ui/react'

function ReturnsCalculator() {
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [investmentRange, setInvestmentRange] = useState([0, 0]);
    const [stockReturns, setStockReturns] = useState(0);
    const [mutualFundReturns, setMutualFundReturns] = useState(0);

    const handleInitialInvestmentChange = (e) => {
        setInitialInvestment(Number(e.target.value));
    };

    const handleInvestmentRangeChange = (e) => {
        setInvestmentRange([Number(e.target.value), Number(e.target.value2)]);
    };

    const handleStockReturnsChange = (e) => {
        setStockReturns(Number(e.target.value));
    };

    const handleMutualFundReturnsChange = (e) => {
        setMutualFundReturns(Number(e.target.value));
    };

    const calculateReturns = () => {
        const totalInvestment = (investmentRange[1] - investmentRange[0]) + initialInvestment;
        const stockReturn = totalInvestment * (stockReturns / 100);
        const mutualFundReturn = totalInvestment * (mutualFundReturns / 100);

        return {
            stock: totalInvestment + stockReturn,
            mutualFund: totalInvestment + mutualFundReturn,
        };
    };


    const [sliderValue1, setSliderValue1] = useState(10000);
    const [sliderValue2,setSliderValue2] = useState(5);
    const [sliderValue3,setSliderValue3] = useState(10);

    return (
        <div>
            <div className="container">
                <div className="row" style={{width:"100%"}}>
                    <div className="col-md-auto" style={{ color: "white",width:"100%" }}>
                        <FormControl style={{width:"25vw"}}>
                            <FormLabel htmlFor="initialInvestment">Initial Investment:</FormLabel>
                            <Slider aria-label='slider-ex-1' defaultValue={10000} min={1000} max={1000000} onChange={(val) => setSliderValue1(val)}>
                                <SliderMark
                                    value={sliderValue1}
                                    textAlign='center'
                                    bg='blue.800'
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

                            <FormLabel htmlFor="investmentRange">Investment Range:</FormLabel>
                            <Slider aria-label='slider-ex-1' defaultValue={5} min={0} max={30} onChange={(val) => setSliderValue2(val)}>
                                <SliderMark
                                    value={sliderValue2}
                                    textAlign='center'
                                    bg='blue.800'
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

                            <FormLabel htmlFor="stockReturns">Stock Returns (%):</FormLabel>
                            <Slider aria-label='slider-ex-1' defaultValue={10} min={1} max={50} onChange={(val) => setSliderValue3(val)}>
                                <SliderMark
                                    value={sliderValue3}
                                    textAlign='center'
                                    bg='blue.800'
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
                            {/* <input type="number" id="stockReturns" value={stockReturns} onChange={handleStockReturnsChange} /> */}

                            <FormLabel htmlFor="mutualFundReturns">Mutual Fund Returns (%):</FormLabel>
                            {/* <input type="number" id="mutualFundReturns" value={mutualFundReturns} onChange={handleMutualFundReturnsChange} /> */}

                            <button onClick={calculateReturns}>Calculate Returns</button>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReturnsCalculator;
