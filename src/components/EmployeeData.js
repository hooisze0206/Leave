import React, { useState, useEffect } from "react";
import Employee from "./employee";
import LoadingSpinner from "../UI/LoadingSpinner";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function EmployeeData() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/get_user_details.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then(
        (json) => {
          sleep(1000).then(() => {
            console.log("testing");
            setData(json);
            setIsLoaded(true);
          });
        },
        (error) => {
          setError(error);
          setIsLoaded(false);
        }
      );
  });

  if (isLoaded) {
    return <Employee item={data}></Employee>;
  } else if (error) {
    return <Employee error={error.message}></Employee>;
  } else {
    return <Employee item={data}></Employee>;
  }
}

export default EmployeeData;
