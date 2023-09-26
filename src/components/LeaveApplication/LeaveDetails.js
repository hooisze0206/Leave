import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { useResource } from "../../Common/useResource";
import { FaLongArrowAltDown } from "react-icons/fa";

import LeaveProgressStatus from "./LeaveProgressStatus";

import "./leave.css";

function LeaveDetails(props) {
  console.log(props);
  const [isDisable, setDisable] = useState(false);
  useEffect(() => {
    if (props.show === false) {
      return;
    }

    if (
      new Date(props.leave_details[0].start) < new Date() ||
      !(
        props.leave_details[0].status !== "Cancelled" ||
        props.leave_details[0].status !== "Cancelled"
      )
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [props]);

  const data = useResource("leave/progress/" + props.leave_id);
  console.log(data);

  if (data === null || data === "No data") {
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputValue = {
      user_id: props.leave_details[0].user_id,
      leave_id: props.leave_id,
      leave_type: props.leave_details[0].title,
      amount: props.leave_details[0].amount,
      status: "Cancelled",
      action: "Cancelled",
    };
    console.log(allInputValue);
    fetch("/leave/update_leave_request", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allInputValue),
    })
      .then((res) => res.json())
      .then(async (data) => {
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
      <Modal show={props.show} onHide={props.hide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{props.leave_details[0].title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flexbox">
            <div style={{ width: "250px", textAlign: "center" }}>
              <LeaveProgressStatus
                leave_id={props.leave_id}
              ></LeaveProgressStatus>
            </div>

            <span className="divider"></span>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Leave Type: </label>
                  <input
                    className="form-control col"
                    name="leave_type"
                    type="text"
                    value={props.leave_details[0].title}
                    disabled
                  ></input>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label>From: </label>
                    <input
                      className="form-control col"
                      name="start"
                      type="date"
                      value={props.leave_details[0].start}
                      disabled
                    ></input>
                  </div>
                  <div className="form-group col">
                    <label>To: </label>
                    <input
                      className="form-control col"
                      name="leave_type"
                      type="date"
                      value={props.leave_details[0].end}
                      disabled
                    ></input>
                  </div>
                </div>

                <div className="form-group">
                  <label>Amount: </label>
                  <input
                    className="form-control col"
                    name="amount"
                    type="text"
                    value={props.leave_details[0].amount}
                    disabled
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={props.hide}>
            Close
          </button>
          <button
            hidden={isDisable}
            className="btn btn-outline-danger remove-btn"
            onClick={handleSubmit}
            disabled={isDisable}
          >
            Remove
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LeaveDetails;
