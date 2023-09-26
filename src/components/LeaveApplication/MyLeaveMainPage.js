import UpcomingLeaveHoliday from "./Upcoming_leave_holiday";
import AllLeaveRequest from "./AllLeaveRequest";
import LeaveBalance from "./LeaveBalance";

function MyLeaveMainPage() {
  return (
    <>
      <div className="leave-main">
        <div className="leave-main-left">
          <LeaveBalance></LeaveBalance>
          <br></br>
          <AllLeaveRequest></AllLeaveRequest>
        </div>
        <div className="leave-main-right">
          <UpcomingLeaveHoliday></UpcomingLeaveHoliday>
        </div>
      </div>
    </>
  );
}

export default MyLeaveMainPage;
