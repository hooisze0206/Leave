import LeaveHistory from "./LeaveHistory";
import ManageAllLeaveRequest from "./Manager-AllLeaveRequest";
import PendingLeaveApproval from "./PendingApprovalLeave";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user;
}

function Manage_Leave_MainPage() {
  const user = getUser();
  let status = 0;
  if (user.roles === "Admin") {
    status = 2;
  } else if (user.roles === "Manager") {
    status = 4;
  }
  return (
    <>
      {status !== 0 ? (
        <div>
          <PendingLeaveApproval
            status={status}
            role={user.roles}
            user={user.user_id}
          ></PendingLeaveApproval>
        </div>
      ) : (
        <></>
      )}
      <br></br>
      <LeaveHistory role={user.roles} user={user.user_id}></LeaveHistory>
    </>
  );
}

export default Manage_Leave_MainPage;
