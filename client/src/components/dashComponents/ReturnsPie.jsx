import React, { Component } from "react";
import Chart from "react-apexcharts";

class RadialBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["A", "B", "C", "D", "E"],
        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "right",
          offsetX: 160,
          offsetY: 364,
          labels: {
            useSeriesColors: true
          },
          itemMargin: {
            horizontal: 10,
            vertical: 10
          },
          inverseOrder: true
        },
        stroke: {
          curve: "smooth",
          lineCap: "round"
        },
        chart: {
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 2000,
            animateGradually: {
              enabled: true,
              delay: 500
            },
            dynamicAnimation: {
              enabled: true,
              speed: 250
            }
          }
        },
        plotOptions: {
          radialBar: {
            size: undefined,
            inverseOrder: false,
            startAngle: -180,
            endAngle: 90,
            offsetX: 0,
            offsetY: 0,
            hollow: {
              size: "50%",
              background: "transparent"
            },
            track: {
              show: true,
              background: "#000000",
              strokeWidth: "100%",
              opacity: 1,
              margin: 5
            },
            dataLabels: {
              show: false,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: undefined,
                color: "white",
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: undefined,
                color: 'white',
                offsetY: 16,
                formatter: function (val) {
                  return val + "%";
                }
              },
              total: {
                show: true,
                label: "Total",
                color: "#fff",
                formatter: function (w) {
                  return (
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0) /
                      w.globals.series.length +
                    "%"
                  );
                }
              }
            }
          }
        }
      },

      series: [100, 75]
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          width="500"
        />
      </div>
    );
  }
}

export default RadialBar;
