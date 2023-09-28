import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import "./Feedback.css";

function BugReport({ user }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    feature: "",
    feedback: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allInputValue = {
      feature: formValue.feature,
      feedback: formValue.feedback,
      feedback_type: "Bug Report",
      user_id: user?.user_id,
    };
    console.log(allInputValue);
    fetch("index.php/feedback", {
      method: "POST",
      body: JSON.stringify(allInputValue),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Success") {
          setFormValue({ feature: "", feedback: "" });
          navigate("/my_feedback");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="message">
          <span>
            Please provide bug report by selecting feature below and including
            detailed description:
          </span>
        </div>
        <div className="content-features">
          <label htmlFor="features">Features:</label>
          <select
            name="feature"
            id="feature"
            className="form-control"
            value={formValue.feature}
            onChange={handleInput}
            required
          >
            <option default value="" disabled>
              please choose a feature
            </option>
            <option>department</option>
            <option>others</option>
          </select>
        </div>
        <br></br>
        <label htmlFor="feedback">Feedback:</label>
        <br></br>
        <textarea
          className="form-control"
          name="feedback"
          rows={4}
          value={formValue.feedback}
          onChange={handleInput}
          required
        />
        <br></br>
        <div className="message">
          <span>
            Thanks for taking the time to give us feedback, we do use yours
            feedbacks to improve our product experience to everyone.
          </span>
        </div>
        <div className="message">
          <span>
            We may use feedback or suggestions submitted by the community
            without any restriction or obligation to provide compensation for
            them or keep them confidential.
          </span>
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default BugReport;
