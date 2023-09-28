import { useResource } from "../../Common/useResource";
import { useList } from "../../Common/useList";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Button from "../../UI/Button";
import "./EmployeeDetails.css";
import { Divider } from "rsuite";
import { useNavigate } from "react-router-dom";

export const role_options = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Employee", label: "Employee" },
];

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
  // return "Employee";
}

function Start(data) {
  const all_departments = useResource("/department");
  const dept_options = useList(all_departments, "department_name");

  const all_positions = useResource("/utility/position/" + data);
  const position_options = useList(all_positions, "position");

  return [dept_options, position_options];
}

function EmployeeDetails() {
  const navigate = useNavigate();

  var dept = "1";
  const params = useParams();
  let formValue = useResource("/user/" + params.user_id);

  if (formValue != null) {
    dept = formValue.department_name;
  }

  const user = getUser();

  let options = Start(dept);
  const [userIDMessage, setUserMessage] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

  if (formValue === null) {
    return <LoadingSpinner />;
  } else if (formValue.error) {
    return <LoadingSpinner />;
  }

  const checkUserID = (e) => {
    if (e === "") {
      return;
    }
    const input = {
      user_id: e,
    };
    fetch("index.php/login/checkUserID", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserMessage(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDepartment = (e) => {
    formValue.department_name = e;
    setDepartment(e);
  };

  const handleRole = (e) => {
    formValue.roles = e;
    setRole(e);
  };

  const handlePosition = (e) => {
    formValue.position = e;
    setPosition(e);
  };

  const handleStatus = (e) => {
    formValue.status = e;
    setStatus(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIDMessage === "exist") {
      const msg = {
        status: "Failed",
        message: "User ID is exist, please try another one",
      };
      // setOutput(msg);
      return;
    }
    const allInputValue = {
      name: formValue.name,
      user_id: formValue.user_id,
      email: formValue.email,
      phone: formValue.phone,
      address: formValue.address,
      city: formValue.city,
      zip_code: formValue.zip_code,
      department: formValue.department_name,
      position: formValue.position,
      role: formValue.roles,
      status: formValue.status,
      gender: formValue.gender,
      update_by: user,
    };
    console.log(allInputValue);
    fetch("index.php/user/" + formValue.user_id, {
      mode: "cors",
      method: "PUT",
      body: JSON.stringify(allInputValue),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === "Success") {
          navigate("/employee");
          // setOutput(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInput = async (e) => {
    const { name, value } = e.target;
    formValue = { ...formValue, [name]: value };
    console.log(formValue);
  };

  return (
    <>
      <div className="card class-content">
        <div className="card-header">
          <h5 className="card-title">Update User</h5>
        </div>
        <div className="card-body  page container-xl">
          <form onSubmit={handleSubmit}>
            <fieldset className="border-info">
              <legend className="text-info">Personal Information</legend>
              <div className="form-group row spacing">
                <div className="col-6">
                  <label>User Id: </label>
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control"
                        name="user_id"
                        type="text"
                        defaultValue={formValue.user_id}
                        onBlur={(e) => checkUserID(e.target.value)}
                        onChange={handleInput}
                      ></input>
                    </div>
                    <div className="col">
                      <div className="col">
                        {" "}
                        {userIDMessage !== "" ? (
                          userIDMessage === "available" ? (
                            <div>
                              <FcApproval />
                            </div>
                          ) : (
                            <div>
                              <FcCancel /> Sorry. The User ID is already Exist
                            </div>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group row spacing">
                <div className="col">
                  <label htmlFor="name">Name: </label>
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    type="text"
                    defaultValue={formValue.name}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>
              <div className="form-group row spacing">
                <div className="col">
                  <label>Email: </label>
                  <input
                    className="form-control col"
                    name="email"
                    type="email"
                    defaultValue={formValue.email}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="col">
                  <label>Phone: </label>
                  <input
                    className="form-control col"
                    name="phone"
                    type="text"
                    defaultValue={formValue.phone}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>

              <div className="form-group  spacing">
                <label>Address: </label>
                <input
                  className="form-control col"
                  type="text"
                  defaultValue={formValue.address}
                  name="address"
                  onChange={handleInput}
                ></input>
              </div>
              <div className="form-group row spacing">
                <div className="col">
                  <label>City: </label>
                  <input
                    className="form-control "
                    type="text"
                    name="city"
                    defaultValue={formValue.city}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="col">
                  <label>ZIP code: </label>
                  <input
                    className="form-control "
                    type="text"
                    name="zip_code"
                    defaultValue={formValue.zip_code}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>
            </fieldset>
            <Divider />
            <fieldset className="border-info">
              <legend className="text-info">Company Details</legend>
              <div className=" form-group row spacing">
                <div className="col">
                  <label>Department: </label>
                  <select
                    className="form-select col"
                    value={formValue.department_name}
                    name="department"
                    selected={department === formValue.department_name}
                    // onChange={handleInput}
                    onChange={(e) => handleDepartment(e.target.value)}
                  >
                    {options[0].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label>Position: </label>
                  <select
                    className="form-select col"
                    value={formValue.position}
                    name="position"
                    selected={position === formValue.position}
                    // onChange={handleInput}
                    onChange={(e) => handlePosition(e.target.value)}
                  >
                    {options[1].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group spacing">
                <label className="col-sm-2">Role: </label>
                <select
                  className="form-select col"
                  value={formValue.roles}
                  selected={role === formValue.roles}
                  name="role"
                  // onChange={handleInput}
                  onChange={(e) => handleRole(e.target.value)}
                >
                  {role_options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group spacing">
                <label className="col-sm-2">Status: </label>
                <select
                  className="form-select col"
                  value={formValue.status}
                  name="status"
                  selected={status === formValue.status}
                  // onChange={handleInput}
                  onChange={(e) => handleStatus(e.target.value)}
                >
                  <option value="1">Active</option>
                  <option value="2">Not Active</option>
                </select>
              </div>
            </fieldset>
            <Divider />
            <Button type="submit" value="Submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetails;
