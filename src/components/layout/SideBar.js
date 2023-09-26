import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FcHeadset } from "react-icons/fc";
import {
  FaHome,
  FaUserTie,
  FaThumbsUp,
  FaBriefcase,
  FaEdit,
  FaChartArea,
} from "react-icons/fa";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import "./SideBar.css";
import logo from "../utilities/Images/logo1.png";

function getRole() {
  const roleString = sessionStorage.getItem("user");
  const userRole = JSON.parse(roleString);

  return userRole?.roles;
}

function SideBar() {
  const [isDisable, setDisable] = useState(false);
  const role = getRole();

  return (
    <div className="sidebar">
      <div className="col">
        <br></br>
        <div className="row center" style={{ paddingLeft: "15px" }}>
          <img src={logo} alt="Logo" height={"5%"} />
        </div>
        <br></br>
        <div className="row center">
          <small style={{ color: "gray" }}>{role}</small>
        </div>
        <br></br>
        <div className="row navlist">
          <NavLink to="/" activestyle="active">
            <FaHome className="icon" />
            Home
          </NavLink>
        </div>
        <div className="row navlist" hidden={role !== "Admin" ? true : false}>
          <NavLink to="/employee" activestyle="active">
            <FaUserTie className="icon" />
            Employees
          </NavLink>
        </div>
        <div className="row navlist" hidden={role !== "Admin" ? true : false}>
          <NavLink to="/department" activestyle="active">
            <FaBriefcase className="icon" />
            Department
          </NavLink>
        </div>
        <div className="row navlist" hidden={role === "Admin" ? true : false}>
          <NavLink to="/my_leave" activestyle="active">
            <BsFillCalendarWeekFill className="icon" />
            Leave Request
          </NavLink>
        </div>
        <div
          className="row navlist"
          hidden={role === "Employee" ? true : false}
        >
          <NavLink to="/all_leave" activestyle="active">
            <BsFillCalendarWeekFill className="icon" />
            Leaves
          </NavLink>
        </div>
        <div className="row navlist" hidden={role === "Admin" ? true : false}>
          <NavLink to="/my_feedback" activestyle="active">
            <FaEdit className="icon" />
            Feedback
          </NavLink>
        </div>
        <div className="row navlist" hidden={role !== "Admin" ? true : false}>
          <NavLink to="/all_feedbacks" activestyle="active">
            <FaEdit className="icon" />
            Feedbacks
          </NavLink>
        </div>
        <div className="row navlist">
          <NavLink to="/all_reports" activestyle="active">
            <FaChartArea className="icon" />
            Reports
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
