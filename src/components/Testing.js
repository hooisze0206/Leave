import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import "./Test.css";
function Testing() {
  const [open, setOpen] = useState(false);
  const [className, setClass] = useState("hide");

  const handleOpen = () => {
    console.log(open);
    console.log(className);
    if (!open) {
      setClass("show");
      setOpen(true);
    } else {
      setClass("hide");
      setOpen(false);
    }
  };
  return (
    <div className="card card-outline card-primary">
      <button onClick={handleOpen} data-toggle="myDropdown">
        <span className="round">HH</span>&nbsp;&nbsp; Hooi Sze&nbsp;&nbsp;
        <FaAngleDown></FaAngleDown>
      </button>
      <div className={`menu row `} id="myDropdown">
        <ul className={`${className}`}>
          <li>Profile</li>
          <li>Forgot Password</li>
          <li>Logout</li>
          <li>Logout</li>
          <li>Logout</li>
          <li>Logout</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default Testing;
