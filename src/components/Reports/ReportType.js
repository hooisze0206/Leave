import GraphReport from "./GraphReport";
import LeaveReports from "./LeaveReports";
import LeaveUtilizeReport from "./LeaveUtilizeReport";

function ReportType(props) {
  if (props.type === "leaves") {
    return <LeaveReports></LeaveReports>;
  } else if (props.type === "annual") {
    return <LeaveUtilizeReport></LeaveUtilizeReport>;
  } else if (props.type === "graph") {
    return <GraphReport></GraphReport>;
  }
  return (
    <>
      <div></div>
    </>
  );
}

export default ReportType;
