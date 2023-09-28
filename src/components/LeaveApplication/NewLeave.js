import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";
import UseToast from "../../UI/UseToast";

export const leave_type_options = [
  {
    value: "Annual Leave",
    label: "Annual Leave",
    isdisable: false,
  },
  {
    value: "Sick Leave",
    label: "Sick Leave",
    isdisable: false,
  },
  {
    value: "Unpaid Leave",
    label: "Unpaid Leave",
    isdisable: false,
  },
];
export const leave_options = [
  { value: "All Day", label: "All Day", disabled: false },
  { value: "Half Day - Morning", label: "Half Day - Morning", disabled: true },
  {
    value: "Half Day - Afternoon ",
    label: "Half Day - Afternoon",
    disabled: true,
  },
];

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function NewLeave(props) {
  const [balance, setBalance] = useState("");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [offdays, setOffDays] = useState(0);
  const [leave_type, setLeaveType] = useState("");
  const [leave, setLeave] = useState("All Day");
  const [output, setOutput] = useState();
  const [isHide, setHide] = useState(true);
  const [isDisable, setDisable] = useState(false);
  let isdisable = false;
  let off;

  if (props.data === undefined || props.info === undefined) {
    return;
  } else {
    props.data.start = new Date(props.data.start).toLocaleDateString("en-CA");
    props.data.end = new Date(props.data.end).toLocaleDateString("en-CA");
    let startdate = new Date(props.data.start).getTime();
    let enddate = new Date(props.data.end).getTime();
    let difference = enddate - startdate;
    off = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

    if (off > 1) {
      isdisable = true;
    }

    if (props.info[0].annual_leave_balance <= 0) {
      leave_type_options.map((option) =>
        option.label === "Annual Leave"
          ? (option.isdisable = true)
          : (option.isdisable = false)
      );
    } else if (props.info[0].sick_leave_balance <= 0) {
      leave_type_options.map((option) =>
        option.label === "Sick Leave"
          ? (option.isdisable = true)
          : (option.isdisable = false)
      );
    }
  }

  const handleLeaveType = (e) => {
    console.log(e);
    if (e === "Annual Leave") {
      setBalance(props.info[0].annual_leave_balance);
    } else if (e === "Sick Leave") {
      setBalance(props.info[0].sick_leave_balance);
    } else {
      setBalance(props.info[0].unpaid_leave_balance);
    }
    setLeaveType(e);
  };

  const handleLeave = (e) => {
    setLeave(e);
  };

  const handleStartDate = (e) => {
    console.log(e);
    props.data.start = e;

    setOffDays(off);
    // if (off < 1) {
    //   console.log(offdays);
    //   setStartError("Start date later than end date");
    // } else {
    //   setStartError("");
    //   setEndError("");
    // }
  };

  const handleEndDate = (e) => {
    console.log(e);
    props.data.end = e;

    setOffDays(off);
  };

  const resetStatus = () => {
    setBalance("");
    setOffDays(0);
    setLeaveType("");
    props.hide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (leave_type === "") {
      return;
    }
    const allInputValue = {
      leave_type: leave_type,
      day: leave,
      start_date: props.data.start,
      end_date: props.data.end,
      amount: off,
    };
    setDisable(true);
    setHide(false);
    console.log(allInputValue);
    fetch("index.php/leave/add_leave_request/" + props.info[0].user_id, {
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
        sleep(600);
        setOutput(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Modal show={props.show} size="md">
          <Modal.Header>
            <Modal.Title>New Leave Request</Modal.Title>
            <div>
              <span className="close-button" onClick={resetStatus}>
                x
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="row">
                <div className="col">
                  <label htmlFor="leave_type">Leave Type</label>
                  <select
                    className="form-select col"
                    name="leave_type"
                    onChange={(e) => handleLeaveType(e.target.value)}
                    value={leave_type}
                  >
                    <option disabled value="">
                      Select Leave Type
                    </option>
                    {leave_type_options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.isdisable}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="leave">Leave</label>
                  <select
                    className="form-select col"
                    name="leave"
                    disabled={isdisable}
                    onChange={handleLeave}
                    value={leave}
                  >
                    {leave_options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="start_date">From</label>
                  <input
                    id="start_date"
                    className="form-control"
                    name="start_date"
                    type="date"
                    defaultValue={props.data.start}
                    onChange={(e) => handleStartDate(e.target.value)}
                  ></input>
                  <small>{startError}</small>
                </div>
                <div className="col">
                  <label htmlFor="end_date">to</label>
                  <input
                    id="end_date"
                    className="form-control"
                    name="end_date"
                    type="date"
                    defaultValue={props.data.end}
                    onChange={(e) => handleEndDate(e.target.value)}
                  ></input>
                  <small>{endError}</small>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="days">Number of Days</label>
                  <input
                    id="days"
                    className="form-control"
                    name="days"
                    type="text"
                    value={off}
                    disabled
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="balance">Leave Balance</label>
                  <input
                    id="balance"
                    className="form-control"
                    name="balance"
                    type="text"
                    defaultValue={balance}
                    disabled
                  ></input>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="secondary-button" onClick={resetStatus}>
              Close
            </button>
            <button
              className="primary-button"
              type="submit"
              onClick={handleSubmit}
              disabled={isDisable}
            >
              <span hidden={isHide}>
                <Loader style={{ paddingRight: "5px" }} size="sm" />
              </span>
              Apply
            </button>
          </Modal.Footer>
        </Modal>
      </form>
      <UseToast open={output} />
    </>
  );
}

export default NewLeave;
