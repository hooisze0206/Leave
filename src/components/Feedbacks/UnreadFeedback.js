import React, { useState, useMemo } from "react";
import { useList } from "../../Common/useList";
import { useResource } from "../../Common/useResource";
import "./Feedback.css";
import LoadingSpinner from "../../UI/LoadingSpinner";
function UnreadFeedback({ status }) {
  const [feedback_type, setFeedbackType] = useState("");
  const [feedbacks, setFeedbacks] = useState("");

  var all_feedback = useResource("feedback/" + status);
  console.log(all_feedback);

  const data = useResource("utility/feedback_type");
  const feedback_options = useList(data, "feedback_type");
  if (all_feedback === null) {
    return <LoadingSpinner />;
  } else if (all_feedback.error) {
    return <LoadingSpinner />;
  }
  const handleFeedbackType = (value) => {
    console.log(value);
    setFeedbackType(value);
    const filtered = all_feedback.filter((type) => {
      console.log(type);
      return value === type["feedback_type"];
    });
    all_feedback = filtered;
    console.log(all_feedback);
  };
  return (
    <>
      <select
        className="form-select col"
        name="department"
        value={feedback_type}
        onChange={(e) => handleFeedbackType(e.target.value)}
      >
        <option value="">All</option>
        {feedback_options.map((option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <br></br>
      <div>
        {all_feedback.map((item, index) => (
          <>
            <div className="card card-outline card-primary">
              <div className="row">
                <div className="col">
                  ID: {item["id"]}
                  <br></br>
                  {item["user_id"]}
                </div>
                <div className="col">
                  {item["feedback_type"] === "Reviews" ? (
                    <span>
                      Rate <em>{item["feature"]}</em> stars
                    </span>
                  ) : (
                    <span>
                      Title <h5>{item["feature"]}</h5>
                    </span>
                  )}
                  <p>{item["feedback"]}</p>
                </div>
                <div className="col">{item["feedback_type"]}</div>
                <div className="col">{item["status"]}</div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default UnreadFeedback;
