import { Divider, Loader } from "rsuite";
import React, { useState, useEffect } from "react";
import { useResource } from "../../../Common/useResource";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FcApprove } from "react-icons/fc";
import "./manage_leave.css";
import ConfirmationModal from "../../../UI/ConfirmationModal";

function PendingLeaveApproval(props) {
  const [data, setData] = useState();
  const [filteredData, setFilterData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const allInputValue = {
      user_id: props.user,
    };
    console.log(allInputValue);
    fetch("index.php/leave/pending_leave/" + props.status, {
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
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [props]);

  if (data === null) {
    return (
      <div className="card">
        <div className="card-body pending-card">
          <h3>Pending Approval</h3>
          <Loader backdrop size="md" content="Loading..." vertical />
        </div>
      </div>
    );
  } else if (data === "No data") {
    return (
      <div className="card">
        <div className="card-body pending-card">
          <h3>Pending Approval</h3>
          <div className="empty-card">
            <FcApprove size={"50px"} />
            <br></br>
            <div style={{ fontWeight: "bold", padding: "20px" }}>
              No Pending Approval
            </div>
            <div>You already clear off all pending approvals</div>
          </div>
        </div>
      </div>
    );
  }

  const confirm = () => {
    fetch("index.php/leave/update_leave_request", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);

        if (data.status === "Success") {
          setTimeout(() => window.location.reload(), 3000);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const action = (state) => {
    console.log(state.target.id);
    const filteredData = data.filter(function (item) {
      return String(item.id) === String(state.target.id);
    });
    console.log(filteredData);
    const allInputValue = {
      user_id: filteredData[0].user_id,
      leave_id: state.target.id,
      leave_type: filteredData[0].leave_type,
      amount: filteredData[0].amount,
      start_date: filteredData[0].start_date,
      end_date: filteredData[0].end_date,
      status: state.target.name,
      action: state.target.name,
    };
    console.log(allInputValue);
    setFilterData(allInputValue);
    var status = "";
    if (
      state.target.name === "Manager_Approved" ||
      state.target.name === "Admin_Approved"
    ) {
      status = "Approved";
    } else {
      status = state.target.name;
    }
    setTitle(status + " Leave Request");
    var body = (
      <div>
        <p>Do you confirm to {status} leave requested:</p>
        <br></br>
        <p>
          <span style={{ fontWeight: "bold" }}>User: </span>
          {filteredData[0].user_id}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Leave ID: </span>
          {state.target.id}
        </p>
      </div>
    );
    setBody(body);
    setTimeout(() => setShowModal(true), 1000);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h3>Pending Approval</h3>
          <br></br>
          <div>
            {data ? (
              data.map((option) => (
                <>
                  <Divider />
                  <div
                    className="row justify-content-between "
                    style={{ padding: "10px" }}
                  >
                    <div className="col-2">
                      <span style={{ fontWeight: "bold" }}>
                        {option.user_id}
                      </span>
                      <br></br>
                      <span style={{ color: "gray", fontSize: "14px" }}>
                        {option.leave_type}
                      </span>
                    </div>
                    <div className="col-3">
                      <table>
                        <tr>
                          <td>From:</td>
                          <td>{option.start_date}</td>
                        </tr>
                        <tr>
                          <td>To:</td>
                          <td>{option.end_date}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-2">
                      <span
                        style={{
                          backgroundColor: option.color,
                          borderRadius: "10px",
                          padding: "5px",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        {option.status}
                      </span>
                    </div>
                    <div className="col-4" style={{ textAlign: "end" }}>
                      <span style={{ padding: "3px" }}>
                        <button
                          className="reject_btn"
                          onClick={action}
                          id={option.id}
                          name="Rejected"
                          disabled={
                            option.status === "Approved" ||
                            option.status === "Rejected"
                          }
                        >
                          <FaTimes className="check-icon" />
                          Reject
                        </button>
                      </span>
                      <span style={{ padding: "3px" }}>
                        <button
                          className="approve_btn "
                          onClick={action}
                          id={option.id}
                          name={
                            props.role === "Admin"
                              ? "Admin_Approved"
                              : "Manager_Approved"
                          }
                          disabled={
                            option.status === "Approved" ||
                            option.status === "Rejected"
                              ? true
                              : false
                          }
                        >
                          <FaCheck fill="white" className="check-icon" />
                          Approve
                        </button>
                      </span>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {showModal ? (
        <ConfirmationModal
          show={showModal}
          hide={handleClose}
          title={title}
          body={body}
          submit={confirm}
        ></ConfirmationModal>
      ) : (
        <></>
      )}
    </>
  );
}

export default PendingLeaveApproval;
