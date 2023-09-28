import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import { useResource } from "../../../Common/useResource";
import "./manage_leave.css";

export const columns = () => [
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
];

function LeaveHistory(props) {
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

  const [data, setData] = useState();
  //   const data = useResource("leave/pending_leave/" + props.status);

  useEffect(() => {
    const allInputValue = {
      user_id: props.user,
      user_role: props.role,
    };
    console.log(allInputValue);
    fetch("index.php/leave/all", {
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
        if (data != "No data") {
          setData(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [props]);

  //   const data = useResource("leave/all");
  console.log(data);
  if (data === null) {
    return;
  }
  return (
    <>
      <div className="card class-content card-outline card-primary">
        <div className="page">
          <DataTable
            fixedHeader
            title="Leave History"
            columns={columns()}
            data={data}
            highlightOnHover
            noDataComponent={
              <div style={{ textAlign: "center", paddingBottom: "30px" }}>
                <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
                  No Record Found
                </div>
                <div>Your team haven't start to apply leaves.</div>
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
    </>
  );
}

export default LeaveHistory;
