import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import UseToast from "../../UI/UseToast";
import { useNavigate } from "react-router-dom";
import { FcApproval, FcCancel } from "react-icons/fc";

function ChangePassword(props) {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState();
  const [isDisabled, setDisable] = useState(true);

  const calculatePasswordStrength = (password) => {
    // Implement your own password strength criteria here
    if (password.length < 6) {
      return "weak";
    } else if (password.length < 10) {
      return "medium";
    } else {
      return "strong";
    }
  };

  const checkCurrentPassword = (pass) => {
    if (pass === "") {
      return;
    }
    const input = {
      user_id: props.user,
      password: pass,
    };

    console.log(input);
    fetch("/login/checkUserPassword", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data);
        if (
          data === "Password Correct" &&
          passError === "" &&
          confirmNewPassword !== ""
        ) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const checkNewPassword = (pass) => {
    setNewPassword(pass);
    const strength = calculatePasswordStrength(pass);
    setPasswordStrength(strength);

    // Provide a message based on the strength
    let message = "";
    switch (strength) {
      case "weak":
        message =
          "Weak password - use a combination of letters, numbers, and symbols.";
        break;
      case "medium":
        message = "Medium use a combination of letters, numbers, and symbols..";
        break;
      case "strong":
        message = "";
        break;
      default:
        message = "";
    }
    setPasswordMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "Password Invalid" || passError !== "") {
      const msg = {
        status: "Failed",
        message: "Password Invalid, please try again",
      };
      setOutput(msg);
      return;
    }
    const allInputValue = {
      user_id: props.user,
      password: newPassword,
    };
    console.log(allInputValue);
    fetch("/login/changePassword", {
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
          //   setOutput(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const confirmPassword = (pass) => {
    console.log(pass);
    if (newPassword !== pass) {
      console.log("different");
      setPasswordError("Password not match.");
      setDisable(true);
      return;
    } else {
      setPasswordError("");
      if (message === "Password Correct") {
        setDisable(false);
      }
    }
  };

  const resetStatus = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordStrength("");
    setPasswordMessage("");
    setPasswordError("");
    props.hide();
  };

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
          <div>
            <span className="close-button" onClick={resetStatus}>
              x
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <div className="row form-group">
                <div className="col ">
                  <label>Current Password</label>
                  <div className="row">
                    <div className="col">
                      <input
                        id="currPass"
                        className="form-control col"
                        name="currPass"
                        type="password"
                        value={currentPassword}
                        autoComplete="off"
                        onBlur={(e) => checkCurrentPassword(e.target.value)}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      ></input>
                    </div>

                    <div className="col">
                      {" "}
                      {message !== "" ? (
                        message === "Password Correct" ? (
                          <div>
                            <FcApproval />
                          </div>
                        ) : (
                          <div>
                            <FcCancel /> The passwword is invalid
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col form-group">
                  <label>New Password</label>
                  <input
                    id="newPass"
                    className="form-control"
                    name="newPass"
                    type="password"
                    value={newPassword}
                    autoComplete="off"
                    onChange={(e) => checkNewPassword(e.target.value)}
                  ></input>
                  <small>Password Strength: {passwordStrength}</small>
                </div>

                <div className="col form-group">
                  <label>Re-type password</label>
                  <input
                    id="confirmPass"
                    className="form-control"
                    name="confirmPass"
                    type="password"
                    value={confirmNewPassword}
                    autoComplete="off"
                    onBlur={(e) => confirmPassword(e.target.value)}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  ></input>
                  <small>{passError}</small>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={resetStatus}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePassword;
