import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import "./Employee/Employee.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import Button from "../UI/Button";

export const columns = (rowClick) => [
  { name: "Name", selector: "name", sortable: true },
  { name: "Idsid", selector: "user_id", sortable: true },
  { name: "Email", selector: "email", sortable: true },
  { name: "Department", selector: "department_name", sortable: true },
  { name: "Position", selector: "position", sortable: true },
  {
    cell: (row) => (
      <button onClick={rowClick} id={row.user_id}>
        Action
      </button>
    ),
    allowOverflow: true,
    button: true,
  },
];

function Employee(data) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [user_role, setUserRole] = useState("");
  // const categoryData = EmployeeData();
  console.log(data);

  if (data.item === null) {
    return <LoadingSpinner />;
  } else if (data.error) {
    return <LoadingSpinner />;
  }

  const filteredData = data.item.filter(
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
    navigate("/testing/" + state.target.id, {
      state: { id: 1, name: "sabaoon" },
    });
  };

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    selectAllRowsItem: false,
    selectAllRowsItemText: "All",
  };

  return (
    <div className="App">
      <Button className="right"> ADD </Button>
      <DataTable
        title="Employee"
        columns={columns(handleButtonClick)}
        data={filteredData}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginationOptions}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <input
                type="text"
                placeholder="Search by name"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="Accounting">Accounting</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Engineering">Engineering</option>
            </select>
            <div style={{ marginRight: "20px" }}></div>
            <select
              value={user_role}
              onChange={(e) => handleUserRoleChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
        }
      />
    </div>
  );
  // return <div>ALl employee</div>;
}

export default Employee;
