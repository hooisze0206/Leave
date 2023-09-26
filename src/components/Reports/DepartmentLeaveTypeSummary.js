import PieChart1 from "../../UI/PieChart1";
import { useResource } from "../../Common/useResource";
import BarChart from "../../UI/BarChart";

function DepartmentLeaveTypeSummary() {
  const department = useResource("/department");
  const summary = useResource("/utility/leave_summary_department_leavetype");

  if (department === null || summary === null) {
    return;
  }
  console.log(summary);
  var data = [["Department", "Annual Leave", "Sick Leave", "Unpaid Leave"]];
  department.map((item) => {
    var annual_count = 0;
    var sick_count = 0;
    var unpaid_count = 0;
    summary.map((item2) => {
      if (item.department_name === item2.department_name) {
        annual_count = item2.annual;
        sick_count = item2.sick;
        unpaid_count = item2.unpaid;
      }
    });
    data.push([item.department_name, annual_count, sick_count, unpaid_count]);

    return data;
  });

  console.log(data);

  return (
    <>
      <div className="card-body">
        <h3>By Department</h3>
        <BarChart
          title="By Department"
          color={["#93C6E7", "#D8D9DA", "#7091F5"]}
          data={data}
          chartTitle={["Leave Total", "Department"]}
        ></BarChart>
      </div>
    </>
  );
}

export default DepartmentLeaveTypeSummary;
