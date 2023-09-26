import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";

import React, { useState, useEffect } from "react";

const colors = {
  orange: "#F7E987",
  grey: "#a9a9a9",
};
function FeedbackDetailsUser(props) {
  console.log(props);
  const [isActive, setActive] = useState(true);

  var stars = 0;
  var ratingValue;
  if (props.details[0]["feedback_type"] === "Reviews") {
    stars = Array(5).fill(0);
    ratingValue = props.details[0]["feature"];
  }

  const resetStatus = () => {
    props.hide();
  };

  const getColor = (index) => {
    console.log(index);
    if (ratingValue > index) {
      return colors.orange;
    }
    return colors.grey;
  };
  return (
    <>
      {props.show === true ? (
        <div>
          <div className="card-body">
            <h2 style={{ paddingTop: "20px", paddingBottom: "30px" }}>
              Feedback Details
            </h2>
            <span style={{ color: "grey" }}>ID: {props.details[0]["id"]}</span>
            <p style={{ color: "grey" }}>{props.details[0]["feedback_type"]}</p>
            <div className="form-group">
              {props.details[0]["feedback_type"] === "Reviews" ? (
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
                          fill={getColor(index)}
                          style={{
                            marginRight: 10,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <label>Feature</label>
                  <input
                    id="feature"
                    className="form-control"
                    name="feature"
                    type="text"
                    value={props.details[0].feature}
                    disabled
                  ></input>
                </div>
              )}
            </div>
            <br></br>
            <div className="">
              <div className="form-group">
                <label>Feedback</label>
                <textarea
                  id="feedback"
                  className="form-control"
                  name="feedback"
                  type="text"
                  rows="5"
                  value={props.details[0].feedback}
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <h2 style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            Feedback Details
          </h2>
          <div style={{ paddingTop: "50px", textAlign: "center" }}>
            Please click a feedback to view the details.
          </div>
        </div>
      )}
    </>
  );
}

export default FeedbackDetailsUser;
