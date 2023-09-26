import React from "react";
import { Chart } from "react-google-charts";

function BarChart(props) {
  const options = {
    chartArea: { width: "50%" },
    colors: props.color,
    isStacked: true,
    hAxis: {
      title: props.chartTitle[0],
      minValue: 0,
    },
    vAxis: {
      title: props.chartTitle[1],
    },
  };
  return (
    <>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={props.data}
        options={options}
      />
    </>
  );
}

export default BarChart;
