import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Toast from "../../UI/UseToast";
import "./login.css";
import login from "../utilities/Images/login.png";
import login1 from "../utilities/Images/login1.png";
import logo from "../utilities/Images/logo.png";
import logo1 from "../utilities/Images/logo1.png";
import ForgotPassword from "../utilities/ForgotPassword";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function LoginUser(credentials) {
  var result;

  fetch("index.php/login", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      result = data;
    })
    .catch((err) => {
      console.log(err.message);
      result = err.message;
    });

  return result;
}

function LoginForm({ setToken }) {
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setError] = useState(false);
  const [formValue, setFormValue] = useState({
    user_id: "",
    password: "",
  });
  const [result, setResult] = useState({
    status: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allInputValue = {
      user_id: formValue.user_id,
      password: formValue.password,
    };
    fetch("index.php/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allInputValue),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data["status"] === "Failed") {
          setResult({ status: data["status"], message: data["message"] });
          setError("Failed to login. Please try again");
        } else {
          setResult({ status: "Pass", message: "Login Success" });
          setToken(data);
          return <Toast prop={result}></Toast>;
        }
        // if (result.status !== "") {
        //   return <Toast prop={result}></Toast>;
        // }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // if (result.status !== "") {
  //   return <Toast prop={result}></Toast>;
  // }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleClose = () => setShowModal(false);

  const forgotPassword = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="container">
        <div className="pos_middle box">
          <div className="centre_flex header_content ">
            <br></br>
            <span>
              <img src={logo1} alt="Logo" height={"13%"} />
            </span>
            <img src={login1} alt="Logo" height={"80%"} />
          </div>
          <div className="centre_flex main_content">
            <div className="border">
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontWeight: "bold" }}>Sign in</h3>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="user_id"
                    value={formValue.user_id}
                    onChange={handleInput}
                  ></input>
                  <span>Username</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="password"
                    value={formValue.password}
                    onChange={handleInput}
                  ></input>
                  <span>Password</span>
                  <i></i>
                </div>
                <div className="link">
                  <a href="#" role="button" onClick={forgotPassword}>
                    Forgot Password
                  </a>
                </div>
                <input type="submit" value="Login"></input>
                <p
                  style={{ paddingTop: "10px", color: "red", fontSize: "12px" }}
                >
                  {errorMsg}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <ForgotPassword show={showModal} hide={handleClose}></ForgotPassword>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default LoginForm;

// LoginForm.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
