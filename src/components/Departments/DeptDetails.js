import Modal from "react-bootstrap/Modal";
import { useResource } from "../../Common/useResource";
import React, { useState, useEffect } from "react";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
  // return "Employee";
}

function DeptDetail(props) {
  const user = getUser();
  const [status, setStatus] = useState(0);

  const department = useResource("department/" + props.department);
  console.log(department);

  if (department === null) {
    return;
  } else if (department.error) {
    return;
  }
  const handleStatus = (e) => {
    department.status = e;
    setStatus(e);
  };

  const resetStatus = () => {
    setStatus(0);
    props.hide();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allInputValue = {
      department: department.department_name,
      status: status,
      update_by: user,
    };

    console.log(allInputValue);
    fetch("/department", {
      mode: "cors",
      method: "PUT",
      body: JSON.stringify(allInputValue),
      headers: {
        "Content-type": "application/json;",
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
    <Modal show={props.show} size="md">
      <Modal.Header>
        <Modal.Title>Update Department Details</Modal.Title>
        <div>
          <span className="close-button" onClick={resetStatus}>
            x
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space">
          <div className="form-group row spacing">
            <label className="col-sm-3" htmlFor="department_name">
              Department:
            </label>
            <input
              className="form-control col"
              disabled
              value={department["department_name"]}
              defaultValue={"...."}
            ></input>
          </div>
          <div className="form-group row spacing">
            <label className="col-sm-3">Status: </label>
            <select
              className="form-select col"
              value={department["status"]}
              selected={department["status"] === status}
              onChange={(e) => handleStatus(e.target.value)}
            >
              <option default value="" disabled>
                ....
              </option>
              <option value={"1"}>Active</option>
              <option value={"2"}>Not Active</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="secondary-button" onClick={resetStatus}>
          Close
        </button>
        <button className="primary-button" onClick={handleSubmit}>
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeptDetail;
