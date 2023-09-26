import PieChart from "../../UI/PieChart";
import { Divider } from "rsuite";
import { useResource } from "../../Common/useResource";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
}

function LeaveBalance() {
  const user = getUser();
  const data = useResource("utility/leave_information/" + user);
  if (data === null) {
    return;
  }

  const annual_used = data[0].total_annual_leave - data[0].annual_leave_balance;
  const annual_leave = [
    ["Type", "Total"],
    ["Leave Balance", data[0].annual_leave_balance],
    ["Used", annual_used],
    // CSS-style declaration
  ];
  const sick_used = data[0].total_sick_leave - data[0].sick_leave_balance;
  const sick_leave = [
    ["Type", "Total"],
    ["Leave Balance", data[0].sick_leave_balance],
    ["Used", sick_used],
    // CSS-style declaration
  ];
  const unpaid_used = data[0].total_unpaid_leave - data[0].unpaid_leave_balance;
  const unpaid_leave = [
    ["Type", "Total"],
    ["Leave Balance", data[0].unpaid_leave_balance],
    ["Used", unpaid_used],
    // CSS-style declaration
  ];
  return (
    <>
      <div
        className="row justify-content-around"
        style={{ paddingLeft: "15px", paddingRight: "15px" }}
      >
        <div className="card col">
          <div className="card-body" style={{ padding: "20px" }}>
            <h5>Annual Leave</h5>
            <PieChart
              data={annual_leave}
              color={["#93C6E7", "#D8D9DA"]}
            ></PieChart>
            Available: {data[0].annual_leave_balance}
            <br></br>
            Used: {annual_used}
          </div>
        </div>
        <div className="card col">
          <div className="card-body">
            <h5>Sick Leave</h5>
            <PieChart
              data={sick_leave}
              color={["#7091F5", "#D8D9DA"]}
            ></PieChart>
            Available: {data[0].sick_leave_balance}
            <br></br>
            Used: {sick_used}
          </div>
        </div>
        <div className="card col">
          <div className="card-body">
            <h5>Unpaid Leave</h5>
            <PieChart
              data={unpaid_leave}
              color={["#8D72E1", "#D8D9DA"]}
            ></PieChart>
            Available: {data[0].unpaid_leave_balance}
            <br></br>
            Used: {unpaid_used}
          </div>
        </div>
      </div>

      {/* <div className="card">
        <div className="leave-balance-card card-body">
          <div>
            <h5>Annual Leave</h5>
            <PieChart
              data={annual_leave}
              color={["#93C6E7", "#D8D9DA"]}
            ></PieChart>
            Available: {data[0].annual_leave_balance}
            <br></br>
            Used: {annual_used}
          </div>
          <div className="divider-vertical"></div>
          <div>
            <h5>Sick Leave</h5>
            <PieChart
              data={sick_leave}
              color={["#7091F5", "#D8D9DA"]}
            ></PieChart>
            Available: {data[0].sick_leave_balance}
            <br></br>
            Used: {sick_used}
          </div>
          <div className="divider-vertical"></div>
          <div>
            <h5>Unpaid Leave</h5>
            <PieChart
              data={unpaid_leave}
              color={["#8D72E1", "#D8D9DA"]}
            ></PieChart>
            Available: {data[0].unpaid_leave_balance}
            <br></br>
            Used: {unpaid_used}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default LeaveBalance;
