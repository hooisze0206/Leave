import ColumnChart from "../../UI/ColumnChart";
import { useResource } from "../../Common/useResource";
import PieChart from "../../UI/PieChart";
import LeaveTypeSummary from "./LeaveTypeSummary";
import BarChart from "../../UI/BarChart";
import DepartmentLeaveTypeSummary from "./DepartmentLeaveTypeSummary";
import { Loader } from "rsuite";
import "./report.css";
function GraphReport() {
  const department = useResource("/department");
  const dept_summary = useResource("/utility/leave_summary_department");

  if (department === null || dept_summary === null) {
    return <Loader backdrop size="md" content="loading..." vertical />;
  }
  console.log(dept_summary);
  var data = [["Department", "Count", { role: "style" }]];
  department.map((item) => {
    var count = 0;
    dept_summary.map((item2) => {
      if (item.department_name === item2.department_name) {
        count = item2.count;
      }
    });
    data.push([item.department_name, count, "#b87333"]);

    return data;
  });

  console.log(data);

  return (
    <>
      <div className=".graph">
        <div className="card">
          <LeaveTypeSummary></LeaveTypeSummary>
        </div>
        <br></br>
        <div className="card">
          <DepartmentLeaveTypeSummary></DepartmentLeaveTypeSummary>
        </div>
      </div>
    </>
  );
}

export default GraphReport;
