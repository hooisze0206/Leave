import DataTable from "react-data-table-component";
import React, { useState, useEffect, useRef } from "react";
import { Loader, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";

import { useResource } from "../../Common/useResource";
import { useList } from "../../Common/useList";
import Button from "../../UI/Button";
import "./Feedback.css";

import FeedbackDetailsUser from "./FeedbackDetailsUser";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
  // return "Employee";
}

export const columns = () => [
  { name: "ID", selector: (row, i) => row.id, sortable: true },
  { name: "Type", selector: (row, i) => row.feedback_type, sortable: true },
];
function AllFeedbackUser() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [allData, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [feedback, setClickFeedback] = useState();
  const [showModal, setShowModal] = useState(false);
  const user = getUser();
  const filteredData = useRef();

  const data = useResource("feedback/get_feedback_by_user/" + user);
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

  const handleClose = () => setShowModal(false);

  function openNewFeedback() {
    navigate("/my_feedback/new");
  }

  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    selectAllRowsItem: false,
    selectAllRowsItemText: "All",
  };

  const handleRowClicked = (row) => {
    const updatedData = data.map((item) => {
      if (row.id !== item.id) {
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected,
      };
    });

    const filteredData = allData.filter(function (item) {
      return String(item.id) === String(row.id);
    });
    setClickFeedback(filteredData);
    setShowModal(true);

    setData(updatedData);
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: "rgba(130, 195, 236, 0.3)",
        userSelect: "none",
      },
    },
  ];
  return (
    <>
      <div className="all-feedback-user">
        <div className="card" style={{ flexGrow: 5 }}>
          <div className="card-body">
            <DataTable
              title={
                <div className="flex-container ">
                  <div>My Feedbacks</div>
                  <div>
                    <Button onClick={openNewFeedback}> NEW </Button>
                  </div>
                </div>
              }
              fixedHeader
              fixedHeaderScrollHeight="500px"
              progressPending={pending}
              progressComponent={
                <Loader size="md" content="loading..." vertical />
              }
              highlightOnHover
              columns={columns()}
              data={allData}
              noDataComponent={
                <div style={{ textAlign: "center", padding: "30px" }}>
                  <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
                    No Record Found
                  </div>
                  <div>
                    You can submit for a feedback. Your feedback is importance
                    for us.
                  </div>
                </div>
              }
              onRowClicked={handleRowClicked}
              conditionalRowStyles={conditionalRowStyles}
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
        </div>
        <div className="card" style={{ flexGrow: 5 }}>
          {showModal === true ? (
            <FeedbackDetailsUser
              show={showModal}
              hide={handleClose}
              details={feedback}
            ></FeedbackDetailsUser>
          ) : (
            <div className="card-body" style={{ backgroundColor: "lightgray" }}>
              <h3 style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                Feedback Details
              </h3>
              <div style={{ paddingTop: "100px", textAlign: "center" }}>
                Please click a feedback to view the details.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllFeedbackUser;
