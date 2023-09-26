import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import { useResource } from "../../../Common/useResource";
import { FaCheck, FaTimes } from "react-icons/fa";

import "./manage_leave.css";

export const columns = (rowClick) => [
  { name: "Employee", selector: (row, i) => row.user_id, sortable: true },
  { name: "Leave Type", selector: (row, i) => row.leave_type, sortable: true },
  { name: "From", selector: (row, i) => row.start_date, sortable: true },
  { name: "End", selector: (row, i) => row.end_date, sortable: true },
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
      <>
        <button
          className="approve_btn"
          onClick={rowClick}
          id={row.id}
          name="approve"
          disabled={
            row.status === "Approved" || row.status === "Rejected"
              ? true
              : false
          }
        >
          <FaCheck fill="white" className="check-icon" />
        </button>
        <button
          className="reject_btn"
          onClick={rowClick}
          id={row.id}
          name="reject"
          disabled={row.status === "Approved" || row.status === "Rejected"}
        >
          <FaTimes className="check-icon" />
        </button>
      </>
    ),
    allowOverflow: true,
    button: true,
  },
];

function Manager_AllLeaveRequest(props) {
  const data = useResource("leave/pending_leave/" + props.status);
  console.log(data);

  if (data === null || data === "No data") {
    return;
  }

  const handleButtonClick = (state) => {
    console.log(state.target.name);
  };

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
            fixedHeader
            title="Pending Approval"
            columns={columns(handleButtonClick)}
            data={data}
            highlightOnHover
            noDataComponent={
              <div className="p-6">{"There are no records to display"}</div>
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
    </>
  );
}

export default Manager_AllLeaveRequest;
