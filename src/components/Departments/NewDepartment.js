import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function NewDepartment() {
  const [formValue, setFormValue] = useState({
    department: "",
    status: 1,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allInputValue = {
      department: formValue.department,
      status: formValue.status,
    };

    console.log(allInputValue);
    fetch("index.php/department", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(allInputValue),
      headers: {
        "Content-type": "application/json;",
      },
    }).then((result) => {
      result.json().then((res) => {
        console.warn("res", res);
      });
    });
  };
  return (
    <>
      <div className="card card-outline card-primary ">
        <div className="card-header">
          <h5 className="card-title">New Department</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group row spacing">
              <label htmlFor="department">Department</label>
              <input
                id="department"
                className="form-control"
                name="department"
                type="text"
                value={formValue.department}
                onChange={handleInput}
              ></input>
            </div>
            <div className="form-group row spacing">
              <label>Status: </label>
              <select
                className="form-select "
                name="status"
                value={formValue.status}
                onChange={handleInput}
              >
                <option value="1">Active</option>
                <option value="0">Not Active</option>
              </select>
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewDepartment;
