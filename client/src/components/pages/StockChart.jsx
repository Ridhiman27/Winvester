import React from 'react'
import ApexCharts from 'apexcharts'


function StockChart(props) {

    let dataArray = []
    for (let i = 0; i < 1000; i++) {
        dataArray.push(props.data[i]); 
    }
    console.log(Array.isArray(dataArray));
    dataArray = dataArray.slice(1,200)

    var options = {
        chart: {
          height: 380,
          type: "line",
          foreColor: '#6D6D6D'
        },
        series: [
          {
            name: "Series 1",
            data: dataArray,
          }
        ],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              {
                offset: 0,
                color: "#EB656F",
                opacity: 1
              },
              {
                offset: 20,
                color: "#FAD375",
                opacity: 1
              },
              {
                offset: 60,
                color: "#61DBC3",
                opacity: 1
              },
              {
                offset: 100,
                color: "#95DA74",
                opacity: 1
              }
            ]
          }
        },
        grid: {
           borderColor: '#6D6D6D'
        },
        xaxis: {
          categories: [
          ]
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();
      


  return (
    <div>
        <div id="chart"></div>
    </div>
  )
}

export default StockChart