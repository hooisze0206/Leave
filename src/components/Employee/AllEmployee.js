import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Loader, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";

import "./Employee.css";
import { useResource } from "../../Common/useResource";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Button from "../../UI/Button";

export const columns = (rowClick) => [
  { name: "Name", selector: (row, i) => row.name, sortable: true },
  { name: "Idsid", selector: (row, i) => row.user_id, sortable: true },
  { name: "Email", selector: (row, i) => row.email, sortable: true },
  {
    name: "Department",
    selector: (row, i) => row.department_name,
    cell: (row) => (
      <span
        style={{
          color: row.color,
          fontWeight: "bold",
        }}
      >
        {row.department_name}
      </span>
    ),
    sortable: true,
  },
  { name: "Position", selector: (row, i) => row.position, sortable: true },
  {
    cell: (row) => (
      <button className="edit-btn" onClick={rowClick} id={row.user_id}>
        View
      </button>
    ),
    allowOverflow: true,
    button: true,
  },
];

export const dept_options = [
  { value: "Accounting", label: "Accounting" },
  { value: "Customer Support", label: "Customer Support" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resource", label: "Human Resource" },
];
export const role_options = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Employee", label: "Employee" },
];

function AllEmployee() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [user_role, setUserRole] = useState("");
  const data = useResource("user");
  console.log(data);

  if (data === null) {
    return (
      <div className="card card-outline space">
        <h3>List of Employee</h3>
        <Placeholder.Grid rows={10} columns={5} />
        <Loader backdrop size="md" content="loading..." vertical />
      </div>
    );
  } else if (data === "No Data") {
    data = "";
  } else if (data.error) {
    return <LoadingSpinner />;
  }

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (category ? item.department_name === category : true) &&
      (user_role ? item.roles === user_role : true)
  );

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleUserRoleChange = (value) => {
    setUserRole(value);
  };

  const handleButtonClick = (state) => {
    console.log("clicked");
    console.log(state.target.id);
    navigate("/employee/" + state.target.id);
  };

  function openNewEmployee() {
    console.log("Open new employee");
    navigate("/employee/new_employee");
  }

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
    <div className="card class-content card-outline card-primary">
      <div className="page">
        <DataTable
          title={
            <div className="flex-container ">
              <div>List of Employee</div>
              <div>
                <Button onClick={openNewEmployee}> NEW </Button>
              </div>
            </div>
          }
          columns={columns(handleButtonClick)}
          data={filteredData}
          highlightOnHover
          noDataComponent={
            <div style={{ textAlign: "center", paddingBottom: "30px" }}>
              <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
                No Record Found
              </div>
              <div>No employee found in record.</div>
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
            >
              <div className="col">
                <input
                  className="form-control input-size"
                  type="text"
                  placeholder="Search by name"
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="col">
                <select
                  className="form-select selectOptions"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">--- Department ---</option>
                  {dept_options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <select
                  className="form-select selectOptions"
                  value={user_role}
                  onChange={(e) => handleUserRoleChange(e.target.value)}
                >
                  <option value="">--- Role ---</option>
                  {role_options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default AllEmployee;
