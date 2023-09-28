import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";

import React, { useState, useEffect } from "react";

const colors = {
  orange: "#F7E987",
  grey: "#a9a9a9",
};
function FeedbackDetails(props) {
  console.log(props);
  const [isActive, setActive] = useState(true);

  var stars = 0;
  var ratingValue;
  if (props.details[0]["feedback_type"] === "Reviews") {
    stars = Array(5).fill(0);
    ratingValue = props.details[0]["feature"];
  }

  const update_feedback = (id) => {
    fetch("index.php/feedback/updateFeedbackStatus/" + id, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);

        if (data.status === "Success") {
          setTimeout(() => window.location.reload(), 3000);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const resetStatus = () => {
    update_feedback(props.details[0]["id"]);
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
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>{props.details[0]["feedback_type"]}</Modal.Title>
          <div>
            <span className="close-button" onClick={resetStatus}>
              x
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
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
                    name="newPass"
                    type="text"
                    value={props.details[0].feedback}
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="secondary-button" onClick={resetStatus}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FeedbackDetails;
