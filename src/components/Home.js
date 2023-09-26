import DashboardUser from "../MainPage/Dashboard-User";
import "./Home.css";
import MyCalendar from "./LeaveApplication/MyCalender";
import UpcomingLeaveHoliday from "./LeaveApplication/Upcoming_leave_holiday";
import PendingLeaveApproval from "./LeaveApplication/manager-leave/PendingApprovalLeave";
import AdminSummary from "./utilities/AdminSummary";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user;
  // return "Employee";
}

function Home() {
  let user = getUser();
  let status = 0;
  if (user.roles === "Admin") {
    status = 2;
  } else if (user.roles === "Manager") {
    status = 4;
  }
  return (
    <>
      <div>
        {user?.name},<h2>Welcome Back!</h2>
        <br></br>
        <div className="row">
          {user.roles === "Employee" ? (
            <>
              <span className="col-8">
                <DashboardUser></DashboardUser>
                <br></br>
                <MyCalendar></MyCalendar>
              </span>
              <span className="col-4">
                <UpcomingLeaveHoliday />
              </span>
            </>
          ) : (
            <></>
          )}
          {user.roles === "Admin" ? (
            <>
              <span className="col-8">
                <AdminSummary status={status}></AdminSummary>
                <br></br>
                {status !== 0 ? (
                  <div>
                    <PendingLeaveApproval
                      status={status}
                      role={user.roles}
                    ></PendingLeaveApproval>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="col-4">
                <UpcomingLeaveHoliday />
              </span>
            </>
          ) : (
            <></>
          )}

          {user.roles === "Manager" ? (
            <>
              <span className="col-8">
                <DashboardUser></DashboardUser>
                <br></br>
                {status !== 0 ? (
                  <div>
                    <PendingLeaveApproval
                      status={status}
                      role={user.roles}
                    ></PendingLeaveApproval>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="col-4">
                <UpcomingLeaveHoliday />
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
