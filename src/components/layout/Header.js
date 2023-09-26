import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import "./Header.css";

import ChangePassword from "../utilities/ChangePassword";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
  // return "Employee";
}
function Header(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [className, setClass] = useState("hide");
  const [showModal, setShowModal] = useState(false);

  const user = getUser();
  if (user) {
    var first_letter = user.substring(0, 2);
  }
  const handleOpen = () => {
    if (!open) {
      setClass("display");
      setOpen(true);
    } else {
      setClass("hide");
      setOpen(false);
    }
  };

  const handleClose = () => setShowModal(false);

  const changePassword = () => {
    setShowModal(true);
  };

  const openUserProfile = () => {
    navigate("/user_profile/" + user);
  };

  const HandleLogout = () => {
    sessionStorage.clear();

    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="header">
        <div>
          <div className="dropdown-btn">
            <button className="user-box" onClick={handleOpen}>
              <span className="round">{first_letter}</span>&nbsp;&nbsp;
              {user}&nbsp;&nbsp;
              <FaAngleDown></FaAngleDown>
            </button>
          </div>
          <div className="dropdown">
            <ul className={`menu ${className}`}>
              <li>
                <a href="#" role="button" onClick={openUserProfile}>
                  User Profile
                </a>
              </li>
              <li>
                <a href="#" role="button" onClick={changePassword}>
                  Change Password
                </a>
              </li>
              <li>
                <a href="#" role="button" onClick={HandleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showModal ? (
        <ChangePassword
          show={showModal}
          hide={handleClose}
          user={user}
        ></ChangePassword>
      ) : (
        <div></div>
      )}
    </>
  );
}
export default Header;
