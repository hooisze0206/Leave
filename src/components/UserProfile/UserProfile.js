import { useResource } from "../../Common/useResource";
import { useList } from "../../Common/useList";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../UI/LoadingSpinner";
import Button from "../../UI/Button";

import { Divider } from "rsuite";

export const role_options = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Employee", label: "Employee" },
];

function Start(data) {
  const all_departments = useResource("/department");
  const dept_options = useList(all_departments, "department_name");
  console.log(dept_options);

  const all_positions = useResource("/utility/position/" + data);
  const position_options = useList(all_positions, "position");
  console.log(position_options);

  return [dept_options, position_options];
}

function UserProfile() {
  var dept = "1";
  const params = useParams();
  console.log(params);
  let data = useResource("/user/" + params.user_id);
  console.log(data);
  if (data != null) {
    dept = data.department_name;
  }

  let options = Start(dept);

  if (data === null) {
    return <LoadingSpinner />;
  } else if (data.error) {
    return <LoadingSpinner />;
  }

  const handleInput = async (e) => {
    const { name, value } = e.target;
    data = { ...data, [name]: value };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allInputValue = {
      name: data.name,
      user_id: data.user_id,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      zip_code: data.zip_code,
      department: data.department_name,
      position: data.position,
      role: data.roles,
      status: data.status,
      gender: data.gender,
      update_by: params.user_id,
    };
    console.log(allInputValue);
    fetch("index.php/user/" + data.user_id, {
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
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
                  <input
                    className="form-control"
                    name="user_id"
                    type="text"
                    defaultValue={data.user_id}
                    disabled
                  ></input>
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
                    defaultValue={data.name}
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
                    defaultValue={data.email}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="col">
                  <label>Phone: </label>
                  <input
                    className="form-control col"
                    name="phone"
                    type="text"
                    defaultValue={data.phone}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>

              <div className="form-group  spacing">
                <label>Address: </label>
                <input
                  className="form-control col"
                  type="text"
                  name="address"
                  defaultValue={data.address}
                  onChange={handleInput}
                ></input>
              </div>
              <div className="form-group row spacing">
                <div className="col">
                  <label className="col-sm-2">City: </label>
                  <input
                    className="form-control col"
                    type="text"
                    name="city"
                    defaultValue={data.city}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="col">
                  <label>ZIP code: </label>
                  <input
                    className="form-control "
                    type="text"
                    name="zip_code"
                    defaultValue={data.zip_code}
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
                    value={data.department_name}
                    // selected={department === data.department_name}
                    disabled
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
                    value={data.position}
                    // selected={position === data.position}
                    disabled
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
                  value={data.roles}
                  //   selected={role === data.roles}
                  disabled
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
                  value={data.status}
                  //   selected={status === data.status}
                  disabled
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

export default UserProfile;
