import { useResource } from "../Common/useResource";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUserTie,
  FaThumbsUp,
  FaBriefcase,
  FaEdit,
  FaChartArea,
} from "react-icons/fa";
import "./Card.css";
const Card = (props) => {
  var count = "...";

  const data = useResource(props.link);
  if (data === null) {
    count = "...";
  } else if (data.error) {
    count = data.error;
  } else {
    count = data[0].count;
  }
  return (
    <>
      <div className="card ">
        <div className="card-body main-card ">
          <table style={{ width: "100%", height: "100%" }}>
            <tr>
              <td>{props.icon}</td>
              <td>
                <div
                  style={{
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  {props.header}
                </div>
                <h4
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: "10px",
                    color: "#1D5D9B",
                  }}
                >
                  {count}
                </h4>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Card;
