import NewDepartment from "./NewDepartment";
import AllDepartment from "./AllDepartments";
import "./department.css";
import Card from "../../UI/Card";
import { FaBriefcase } from "react-icons/fa";

function MainDepartment() {
  return (
    <>
      <div className="flex-position">
        <div className="left-position">
          <div className="flex-position">
            <div className="left-position">
              <Card
                header="All Departments"
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
            <div className="right2-position">
              <Card
                header="Active Departments"
                link="department/active_dept_count"
                icon={
                  <FaBriefcase
                    style={{ backgroundColor: "lightblue" }}
                    className="center-icon"
                    size={"25px"}
                  ></FaBriefcase>
                }
              />
            </div>
          </div>
          <div className="space"></div>
          <NewDepartment />
        </div>
        <div className="right-position">
          <AllDepartment />
        </div>
      </div>
    </>
  );
}

export default MainDepartment;
