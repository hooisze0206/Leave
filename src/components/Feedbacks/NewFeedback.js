import React, { useState, useEffect } from "react";
import FeedbackType from "./FeedbackType";
import "./Feedback.css";

export const feedback_options = [
  { value: "Feature Request", label: "Feature Request" },
  { value: "Bug Report", label: "Bug Report" },
  { value: "Inquiry", label: "Inquiry" },
  { value: "Reviews", label: "Reviews" },
  { value: "Others", label: "Others" },
];

function NewFeedback() {
  const [feedback, setFeedback] = useState("Feature Request");

  const handleFeedbackOpt = (e) => {
    setFeedback(e);
  };

  return (
    <>
      <div className="card card-outline card-primary">
        <div className="card-header">
          <div className="card-title">
            <h1> Feedback</h1>
            <br></br>
            <p>Feedback Options:</p>
            <div className="options">
              {feedback_options.map((option) => (
                <>
                  <div className="radios">
                    <input
                      id={option.label}
                      type="radio"
                      name="option"
                      value={option.value}
                      checked={option.value === feedback}
                      onChange={(e) => handleFeedbackOpt(e.target.value)}
                    ></input>

                    <label htmlFor={option.label}>{option.label}</label>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5>{feedback}</h5>
          <span className="message">
            Let us know how we can improve your experience with our product.
          </span>
          <FeedbackType option={feedback} />
        </div>
      </div>
    </>
  );
}

export default NewFeedback;
