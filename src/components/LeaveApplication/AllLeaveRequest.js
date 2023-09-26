import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";

import { useResource } from "../../Common/useResource";
import Button from "../../UI/Button";
import LeaveDetails from "./LeaveDetails";
import { dateFnsLocalizer } from "react-big-calendar";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
  // return "Employee";
}

export const columns = (rowClick) => [
  { name: "Leave Type", selector: (row, i) => row.title, sortable: true },
  { name: "From", selector: (row, i) => row.start, sortable: true },
  { name: "End", selector: (row, i) => row.end, sortable: true },
  {
    name: "Amount",
    selector: (row, i) => row.amount,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row, i) => row.status,
    cell: (row) => (
      <span
        style={{
          backgroundColor: row.color,
          borderRadius: "10px",
          padding: "5px",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
    cell: (row) => (
      <button className="edit-btn" onClick={rowClick} id={row.id}>
        View
      </button>
    ),
    allowOverflow: true,
    button: true,
  },
];

function AllLeaveRequest() {
  const navigate = useNavigate();
  const user = getUser();
  var data = useResource("leave/requested/" + user);
  const [leave_details, setLeaveDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [leave_id, setLeaveId] = useState("0");

  if (data === null) {
    return (
      <div className="card card-outline space">
        <h3>My Leaves</h3>
        <Placeholder.Grid rows={8} columns={3} />
        <Loader backdrop size="md" content="loading..." vertical />
      </div>
    );
  } else if (data === "No data") {
    data = "";
  }
  function openLeaveRequest() {
    console.log("Open new employee");
    navigate("/my_leave/leave_request");
  }

  const handleButtonClick = (state) => {
    setLeaveId(state.target.id);
    const filteredData = data.filter(function (item) {
      return String(item.id) === String(state.target.id);
    });
    console.log(filteredData);
    setLeaveDetails(filteredData);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    selectAllRowsItem: false,
    selectAllRowsItemText: "All",
  };

  const customStyles = {
    headCells: {
      style: {
        // backgroundColor: "rgba(130, 195, 236, 0.6)",
        color: "rgba(107, 114, 128, 1))",
        fontWeight: "800",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        overflowX: "unset",
      },
    },
    subHeader: {
      style: {
        // backgroundColor: "rgba(249, 250, 251, 1)",
        color: "rgba(107, 114, 128, 1))",
        padding: 16,
      },
    },
  };

  return (
    <>
      <div className="card class-content card-outline card-primary">
        <div className="page">
          <DataTable
            title={
              <div className="flex-container ">
                <div>My Leaves</div>
                <div>
                  <Button onClick={openLeaveRequest}> NEW </Button>
                </div>
              </div>
            }
            columns={columns(handleButtonClick)}
            data={data}
            highlightOnHover
            noDataComponent={
              <div style={{ textAlign: "center", paddingBottom: "30px" }}>
                <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
                  No Record Found
                </div>
                <div>You can start to apply leave.</div>
              </div>
            }
            customStyles={customStyles}
            pagination
            paginationComponentOptions={paginationOptions}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
            subHeader
            subHeaderAlign="left"
            subHeaderComponent={
              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              ></div>
            }
          />
        </div>
      </div>
      {showModal ? (
        <LeaveDetails
          show={showModal}
          hide={handleClose}
          leave_id={leave_id}
          leave_details={leave_details}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default AllLeaveRequest;
