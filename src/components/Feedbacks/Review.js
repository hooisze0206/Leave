import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import Button from "../../UI/Button";
import "./Feedback.css";
const colors = {
  orange: "#F7E987",
  grey: "#a9a9a9",
};
function Review({ user }) {
  const navigate = useNavigate();
  const [ratingValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [isActive, setActive] = useState(false);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setActive(!isActive);
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const getColor = (index) => {
    if (hoverValue > index) {
      return colors.orange;
    }
    if (!hoverValue && ratingValue > index) {
      return colors.orange;
    }

    return colors.grey;
  };
  const [formValue, setFormValue] = useState({
    feedback: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allInputValue = {
      feature: ratingValue,
      feedback: formValue.feedback,
      feedback_type: "Reviews",
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
          setCurrentValue(0);
          setFormValue({ feedback: "" });
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
            Please feel free to provide feedback by given rating and including
            detailed description:
          </span>
        </div>
        <div>
          <label htmlFor="rating">Rating: </label>
          <div className="rating">
            {stars.map((_, index) => {
              return (
                <FaStar
                  className={isActive ? "active" : null}
                  id={index}
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  fill={getColor(index)}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
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

export default Review;
