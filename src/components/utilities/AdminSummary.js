import Card from "../../UI/Card";
import "./adminSummary.css";
import {
  FaHome,
  FaUserTie,
  FaThumbsUp,
  FaBriefcase,
  FaEdit,
  FaChartArea,
} from "react-icons/fa";
import { BsFillCalendarWeekFill } from "react-icons/bs";

function AdminSummary(props) {
  return (
    <>
      <div className="row justify-content-between">
        <div className="col">
          <Card
            header="Total Employee"
            link="utility/employee_count"
            icon={
              <FaUserTie
                style={{ backgroundColor: "lightblue" }}
                className="center-icon"
                size={"25px"}
              ></FaUserTie>
            }
          />
        </div>
        <div className="col ">
          <Card
            header="Total Departments"
            link="department/dept_count"
            icon={
              <FaBriefcase
                style={{ backgroundColor: "lightblue" }}
                className="center-icon"
                size={"25px"}
              ></FaBriefcase>
            }
          />
        </div>
        <div className="col ">
          <Card
            header="Pending Leaves"
            link={"utility/pending_leave_count/" + props.status}
            icon={
              <BsFillCalendarWeekFill
                style={{ backgroundColor: "lightblue" }}
                className="center-icon"
                size={"25px"}
              ></BsFillCalendarWeekFill>
            }
          />
        </div>
        <div className="col ">
          <Card
            header="Unread Feedbacks"
            link="utility/unread_feedback_count"
            icon={
              <FaEdit
                style={{ backgroundColor: "lightblue" }}
                className="center-icon"
                size={"25px"}
              ></FaEdit>
            }
          />
        </div>
      </div>
    </>
  );
}

export default AdminSummary;
