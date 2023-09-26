import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader, Placeholder } from "rsuite";
import "./Feedback.css";
import { useList } from "../../Common/useList";
import { useResource } from "../../Common/useResource";
import LoadingSpinner from "../../UI/LoadingSpinner";
import FeedbackDetails from "./FeedbackDetails";

export const columns = (rowClick) => [
  { name: "ID", selector: (row, i) => row.id, sortable: true },
  { name: "User ID", selector: (row, i) => row.user_id, sortable: true },
  { name: "Type", selector: (row, i) => row.feedback_type, sortable: true },
  {
    cell: (row) => (
      <button className="edit-btn" onClick={rowClick} id={row.id}>
        View
      </button>
    ),
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

function FeedbackStatus(props) {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [pending, setPending] = useState(true);
  const [allData, setData] = useState();
  const [feedback, setClickFeedback] = useState();
  const [showModal, setShowModal] = useState(false);
  const filteredData = useRef();

  const data = useResource("feedback/get_feedback_by_status/" + props.status);
  const type = useResource("utility/feedback_type");
  const feedback_options = useList(type, "feedback_type");
  useEffect(() => {
    if (data === null) {
      return;
    } else if (data.error) {
      return;
    } else {
      filteredData.current = data.filter(
        (item) =>
          item.feedback_type.toLowerCase().includes(searchText.toLowerCase()) &&
          (category ? item.feedback_type === category : true)
      );
      setData(filteredData.current);
      setPending(false);
    }
  }, [category, data, searchText]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleButtonClick = (state) => {
    console.log("clicked");
    console.log(state.target.id);
    const filteredData = allData.filter(function (item) {
      return String(item.id) === String(state.target.id);
    });
    setClickFeedback(filteredData);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    selectAllRowsItem: false,
    selectAllRowsItemText: "All",
  };
  return (
    <>
      <div>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="500px"
          progressPending={pending}
          progressComponent={<Loader size="md" content="loading..." vertical />}
          highlightOnHover
          columns={columns(handleButtonClick)}
          data={allData}
          noDataComponent={
            <div style={{ textAlign: "center", paddingBottom: "30px" }}>
              <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
                No Record Found
              </div>
              <div>Please wait for employee to submit feedbacks.</div>
            </div>
          }
          pagination
          paginationComponentOptions={paginationOptions}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
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
                  <option value="">--- Feedback Type ---</option>
                  {feedback_options.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
        />
      </div>
      {showModal === true ? (
        <FeedbackDetails
          show={showModal}
          hide={handleClose}
          details={feedback}
        ></FeedbackDetails>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default FeedbackStatus;
