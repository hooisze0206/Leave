import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [isHide, setHide] = useState(true);

  const forgotPassword = (e) => {
    if (email === "") {
      return;
    }
    setHide(false);
    e.preventDefault();
    const allInputValue = {
      email: email,
    };

    fetch("/utility/forgotPassword", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(allInputValue),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === "Success") {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>Forgot Password</Modal.Title>
          <div>
            <span className="close-button" onClick={props.hide}>
              x
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <small style={{ color: "grey", textAlign: "center" }}>
              Forgot your password? Enter your email and you will receive an
              email regarding password reset information.
            </small>
            <br></br>
            <br></br>
            <div className="form-group">
              <label>Email</label>
              <input
                id="currPass"
                className="form-control col"
                name="currPass"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <br></br>
            <button
              style={{ width: "100%" }}
              className="primary-button"
              onClick={forgotPassword}
            >
              <span hidden={isHide}>
                <Loader style={{ paddingRight: "5px" }} size="sm" />
              </span>
              Request Password Reset
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgotPassword;
