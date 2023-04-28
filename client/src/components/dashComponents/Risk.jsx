import React, { useState } from "react";
import "./risk.scss"



function Risk() {
  const gaugeElementId = React.useRef(null);

  function percentageInRadians(percentage) {
    return percentage * (Math.PI / 100);
  }
  
  const gaugeRadius = 65;
  const startingY = 70;
  const startingX = 10;
  function setGaugePathValue(gaugeElement, percentage, color) {
  
    const zeroBasedY = gaugeRadius * Math.sin(percentageInRadians(percentage));
    const y = -zeroBasedY + startingY;
    const zeroBasedX = gaugeRadius * Math.cos(percentageInRadians(percentage));
    const x = -zeroBasedX + gaugeRadius + startingX;
  
    gaugeElement.innerHTML = `<path d="M ${startingX} ${startingY} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${x} ${y}" stroke="${color}" stroke-width="10" stroke-linecap="round" />`;
  }
  
  function setDashedGaugeValue(gaugeDOMElement, percentage, color) {
    const arcLength = 126;
    const emptyDashLength = 500;
    const filledArcLength = arcLength * (percentage / 100);
    gaugeDOMElement.style.strokeDasharray = `${filledArcLength} ${emptyDashLength}`;
    gaugeDOMElement.style.strokeDashoffset = filledArcLength;
  }
  
  const [percentage, setPercentage] = useState(40);
  function initialGaugeSetup(
    gaugeElementId,
    inputId,
    meterColor,
    initialValue,
    setGaugeValueCallback
  ) {
  
    const handleChange = (event) => {
      const newPercentage =
        event.target.value > 100 ? 100 : event.target.value < 0 ? 0 : event.target.value;
      setPercentage(newPercentage);
      setGaugeValueCallback(gaugeElementId.current, newPercentage, meterColor);
    };
  
    return (
      <div className="svg-gauge svg-gauge__container gauge-container dashed">
        <span className="label">SVG dashed path</span>
        <div id={gaugeElementId} ref={gaugeElementId}>
          <svg id="svg-dashed-gauge" viewBox="0 0 100 55">
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="red" />
              <stop offset="50%" stopColor="purple" />
            </linearGradient>
            <path className="meter-back-path" d="M 10 50 A 40 40 0 1 1 90 50" fill="none" />
            <path id="dashed-gauge-value-path" fill="none" className="meter-value" d="M 10 50 A 40 40 0 1 1 90 50" />
          </svg>
        </div>
        <input id={inputId} type="number" min="0" max="100" value={percentage} onChange={handleChange} />
      </div>
    );
  }



  React.useEffect(() => {
    // Path Gauge Initial Config
    setGaugePathValue(gaugeElementId.current.querySelector(".meter-value"), 40, "rgb(227 127 215)");
  }, []);

  return (
    <div>
      {initialGaugeSetup(
        gaugeElementId,
        "svg-gauge-percentage-2",
        "rgb(227 127 215)",
        10,
        setGaugePathValue
      )}
    </div>
  );
}

export default Risk;