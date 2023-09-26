import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Loader, Placeholder } from "rsuite";
import { useResource } from "../../Common/useResource";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Button from "../../UI/Button";
import "./department.css";
import DeptDetail from "./DeptDetails";

export const columns = (rowClick) => [
  {
    name: "Department",
    selector: (row, i) => row.department_name,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row, i) => row.status,
    sortable: true,
    cell: (row) =>
      row.status === 1 ? (
        <span
          style={{
            backgroundColor: "#C8E4B2",
            padding: "10px",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          Active
        </span>
      ) : (
        <span
          style={{
            backgroundColor: "#FEBBCC",
            padding: "10px",
            textAlign: "center",
          }}
        >
          Not Active
        </span>
      ),
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

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function AllDepartment() {
  const data = useResource("department");
  const [showModal, setShowModal] = useState(false);
  const [department, setDepartment] = useState("no");
  const [oldDepartment, setOldDepartment] = useState([]);

  if (data === null) {
    return (
      <div className="card card-outline space">
        <h3>List of Departments</h3>
        <Placeholder.Grid rows={8} columns={3} />
        <Loader backdrop size="md" content="loading..." vertical />
      </div>
    );
  } else if (data.error) {
    return (
      <Loader
        style={{ padding: "20px" }}
        size="md"
        content="Loading..."
        vertical
      />
    );
  }

  const openModal = () => {
    setShowModal(true);
  };

  var handleClose = () => {
    setDepartment(0);
    setShowModal(false);
  };

  var handleSuccess = () => {
    console.log("success");
  };

  const handleButtonClick = (state) => {
    setDepartment(state.target.id);
    openModal();
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
        backgroundColor: "rgba(249, 250, 251, 1)",
        color: "rgba(107, 114, 128, 1))",
        padding: 16,
      },
    },
  };

  return (
    <>
      <div className="card card-outline space">
        <h2>List of Departments</h2>
        <DataTable
          columns={columns(handleButtonClick)}
          data={data}
          highlightonhoverr
          pagination
          paginationComponentOptions={paginationOptions}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
          // customStyles={customStyles}
          noDataComponent={<div>{"There are no records to display"}</div>}
        />
      </div>
      <DeptDetail
        show={showModal}
        hide={handleClose}
        success={handleSuccess}
        department={department}
      ></DeptDetail>
    </>
  );
}

export default AllDepartment;
