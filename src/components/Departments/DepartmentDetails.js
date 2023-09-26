import { useResource } from "../../Common/useResource";
import { useList } from "../../Common/useList";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../UI/LoadingSpinner";
import DeptDetail from "./DeptDetails";

export const all_departments = [
  { value: "Accounting", label: "Accounting" },
  { value: "Customer Support", label: "Customer Support" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resource", label: "Human Resource" },
];

function DepartmentDetails() {
  const params = useParams();
  const all_departments = useResource("/department");
  const data = useResource(params.id);
  const dept_options = useList(all_departments, "department_name");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  if (data === null) {
    return;
  } else if (data.error) {
    return;
  }

  const handleDepartment = (e) => {
    data.department_name = e;
    setDepartment(e);
  };

  const handleStatus = (e) => {
    data.status = e;
    setStatus(e);
  };

  var handleSuccess = () => {
    console.log("success");
  };

  return (
    <>
      <div className="container class-content">
        <span>
          <h3>Update</h3>
        </span>
        <form>
          <div className="form-group row spacing">
            <label className="col-sm-2">Department: </label>
            <select
              className="form-select col"
              value={data.department_name}
              selected={department === data.department_name}
              onChange={(e) => handleDepartment(e.target.value)}
            >
              {dept_options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group row spacing">
            <label className="col-sm-2">Status: </label>
            <select
              className="form-select col"
              value={data.status}
              selected={status === data.status}
              onChange={(e) => handleStatus(e.target.value)}
            >
              <option value="1">Active</option>
              <option value="2">Not Active</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}

export default DepartmentDetails;
