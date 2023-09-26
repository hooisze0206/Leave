import PieChart1 from "../../UI/PieChart1";
import { useResource } from "../../Common/useResource";

function LeaveTypeSummary() {
  const leave_type = useResource("/leave/leave_type");
  const leavetype_summary = useResource("/utility/leave_summary_leavetype");

  if (leave_type === null || leavetype_summary === null) {
    return;
  }
  console.log(leavetype_summary);
  var data = [["Leave Type", "Count"]];
  leave_type.map((item) => {
    var count = 0;
    leavetype_summary.map((item2) => {
      if (item.leave_type === item2.leave_type) {
        count = item2.count;
      }
    });
    data.push([item.leave_type, count]);

    return data;
  });

  console.log(data);

  return (
    <>
      <div className="card-body">
        <h3>Overall Leave</h3>
        <PieChart1
          data={data}
          color={["#93C6E7", "#D8D9DA", "#7091F5"]}
          title="Overall Leave"
        ></PieChart1>
      </div>
    </>
  );
}

export default LeaveTypeSummary;
