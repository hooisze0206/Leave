import { IconName } from "react-icons/fa";
import PieChart from "../UI/PieChart";
import LeaveBalance from "../components/LeaveApplication/LeaveBalance";
import MyCalendar from "../components/LeaveApplication/MyCalender";

export const data = [
  ["Type", "Total"],
  ["Leave Balance", 10],
  ["Used", 4],
  // CSS-style declaration
];

function Dashboard_User() {
  return (
    <>
      <LeaveBalance></LeaveBalance>
    </>
  );
}

export default Dashboard_User;
