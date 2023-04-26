import React, { useMemo } from "react";
import { useGauge } from "use-gauge";

const START_ANGLE = 45;
const END_ANGLE = 315;

export default function RiskMeter(props) {
  const { value } = props;
  const gauge = useGauge({
    domain: [0, 100],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 21,
    diameter: 140
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2
  });

  const arcStroke = useMemo(() => {
    let color = "";
    if (value <= 25) {
      color = `green`;
    } else if (value <= 50) {
      color = "yellow";
    } else {
      color = "red";
    }

    return `url(#${color}Gradient)`;
  }, [value]);

  return (
    <div className="p-4">
      <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
        <defs>
          <linearGradient
            id="greenGradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#4ade80"></stop>
            <stop offset="100%" stop-color="#22c55e"></stop>
          </linearGradient>
          <linearGradient
            id="yellowGradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stop-color="#fde047"></stop>
            <stop offset="100%" stop-color="#facc15"></stop>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#f87171"></stop>
            <stop offset="100%" stop-color="#ef4444"></stop>
          </linearGradient>
        </defs>
        <g id="arcs">
          <path
            {...gauge.getArcProps({
              offset: -32,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE
            })}
            fill="none"
            strokeWidth={36}
            className="stroke-gray-200"
          />
          <path
            {...gauge.getArcProps({
              offset: -32,
              startAngle: START_ANGLE,
              endAngle: gauge.valueToAngle(value)
            })}
            strokeWidth={36}
            fill="transparent"
            stroke={arcStroke}
          />
        </g>
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = asValue === 20 || asValue === 80 || asValue === 50;

            return (
              <line
                className="stroke-gray-300"
                strokeWidth={2}
                {...gauge.getTickProps({ angle, length: showText ? 12 : 6 })}
              />
            );
          })}
        </g>
        <g id="needle">
          <circle className="fill-white" {...needle.base} r={20} />

          <line
            className="stroke-gray-600"
            strokeLinecap="round"
            strokeWidth={4}
            x1={needle.base.cx}
            x2={needle.tip.cx}
            y1={needle.base.cy}
            y2={needle.tip.cy}
          />
        </g>
      </svg>
    </div>
  );
}
