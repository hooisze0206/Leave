import { Chart } from "react-google-charts";

function PieChart1(props) {
  const options = {
    is3D: false,
    colors: props.color,
  };
  return (
    <>
      <Chart
        chartType="PieChart"
        data={props.data}
        width="100%"
        height="400px"
        options={options}
      />
    </>
  );
}

export default PieChart1;
