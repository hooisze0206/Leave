import { useParams } from "react-router-dom";
import { useResource } from "../../Common/useResource";
import { useList } from "../../Common/useList";
import React, { useState, useEffect } from "react";
import { Divider } from "rsuite";
import { FcApproval, FcCancel } from "react-icons/fc";
import Button from "../../UI/Button";
import UseToast from "../../UI/UseToast";
import "./EmployeeDetails.css";
import { useNavigate } from "react-router-dom";

export const role_options = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Employee", label: "Employee" },
];
export const gender_options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function Get_department(data) {
  const position_options = useList(data, "position");
  console.log(position_options);

  return position_options;
}

function NewEmployee() {
  const navigate = useNavigate();
  const [userIDMessage, setUserMessage] = useState("");
  const [position_options, setPositionOption] = useState([]);
  const [output, setOutput] = useState();
  const [formValue, setFormValue] = useState({
    name: "",
    user_id: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    department: "",
    position: "",
    role: "",
    status: "",
  });

  const all_departments = useResource("/department");
  const dept_options = useList(all_departments, "department_name");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIDMessage === "exist") {
      const msg = {
        status: "Failed",
        message: "User ID is exist, please try another one",
      };
      setOutput(msg);
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
      department: formValue.department,
      position: formValue.position,
      role: formValue.role,
      status: formValue.status,
      gender: formValue.gender,
    };
    console.log(allInputValue);
    fetch("index.php/user", {
      mode: "cors",
      method: "POST",
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
          setOutput(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        setOutput();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInput = async (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });

    if (name === "department" && value !== "") {
      console.log("choose dept");

      const response = await fetch("/utility/position/" + value);
      const json = await response.json();
      console.log(json);
      setPositionOption(Get_department(json));
    }
  };

  return (
    <>
      <div className="card class-content card-outline card-primary ">
        <div className="card-header">
          <h5 className="card-title">New User</h5>
        </div>
        <div className="card-body page">
          <form onSubmit={handleSubmit}>
            <fieldset className="border-info">
              <legend className="text-info">Personal Information</legend>
              <div className="form-group row spacing">
                <div className="col">
                  <label>User ID: </label>
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control "
                        name="user_id"
                        type="text"
                        value={formValue.user_id}
                        onBlur={(e) => checkUserID(e.target.value)}
                        onChange={handleInput}
                      ></input>
                    </div>
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
              <div className="form-group row spacing">
                <div className="col">
                  <label className="col-sm-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-control col"
                    name="name"
                    type="text"
                    value={formValue.name}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>
              <div className="form-group row spacing">
                <div className="col-6">
                  <label>Gender: </label>
                  <select
                    className="form-select "
                    name="gender"
                    value={formValue.gender}
                    selected={formValue.gender}
                    onChange={handleInput}
                  >
                    <option default value="" disabled>
                      -- Gender --
                    </option>
                    {gender_options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row spacing">
                <div className="col">
                  <label className="col-sm-2">Email: </label>
                  <input
                    className="form-control col"
                    name="email"
                    type="email"
                    value={formValue.email}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="col">
                  <label className="col-sm-2">Phone: </label>
                  <input
                    className="form-control col"
                    name="phone"
                    type="text"
                    value={formValue.phone}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>
              <div className="form-group spacing">
                <label>Address: </label>
                <input
                  className="form-control "
                  name="address"
                  type="text"
                  value={formValue.address}
                  onChange={handleInput}
                ></input>
              </div>
              <div className="form-group row spacing">
                <div className="col">
                  <label className="col-sm-2">City: </label>
                  <input
                    className="form-control col"
                    name="city"
                    type="text"
                    defaultValue={formValue.city}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="col">
                  <label>ZIP code: </label>
                  <input
                    className="form-control "
                    name="zip_code"
                    type="text"
                    defaultValue={formValue.zip_code}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>
            </fieldset>
            <Divider />
            <fieldset className="border-info">
              <legend className="text-info">Company Details</legend>
              <div className="form-group row spacing">
                <div className="col">
                  <label>Department: </label>
                  <select
                    className="form-control csol"
                    name="department"
                    value={formValue.department}
                    onChange={handleInput}
                  >
                    <option default value="" disabled>
                      -- Department --
                    </option>
                    {dept_options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label className="col">Position: </label>
                  <select
                    className="form-select col"
                    name="position"
                    value={formValue.position}
                    onChange={handleInput}
                  >
                    <option default value="" disabled>
                      -- Position --
                    </option>
                    {position_options.map((option) => (
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
                  name="role"
                  value={formValue.role}
                  onChange={handleInput}
                >
                  <option default value="" disabled>
                    -- Role --
                  </option>
                  {role_options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group spacing">
                <label>Status: </label>
                <select
                  className="form-select "
                  name="status"
                  value={formValue.status}
                  selected={formValue.status}
                  onChange={handleInput}
                >
                  <option default value="" disabled>
                    -- Status --
                  </option>
                  <option value="1">Active</option>
                  <option value="2">Not Active</option>
                </select>
              </div>
            </fieldset>
            <Divider />
            <div style={{ alignItem: "end" }}>
              <Button type="submit" value="Submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <UseToast open={output} />
    </>
  );
}

export default NewEmployee;
