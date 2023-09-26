import { Chart } from "react-google-charts";

function PieChart(props) {
  const options = {
    pieHole: 0.7,
    is3D: false,
    colors: props.color,
    legend: "none",
    pieSliceText: "none",
  };
  return (
    <>
      <Chart
        chartType="PieChart"
        data={props.data}
        width="100%"
        height="130px"
        options={options}
      />
    </>
  );
}

export default PieChart;
