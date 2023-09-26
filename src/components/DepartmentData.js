import React, { useState, useEffect } from "react";

export const DepartmentData = (props) => {
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
          setData(json);
          setIsLoaded(true);
        },
        (error) => {
          console.error(error);
          setError(error);
          setIsLoaded(false);
        }
      );
  });

  if (isLoaded) {
    return data;
  }
};

export default DepartmentData;
