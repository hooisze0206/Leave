import React, { useState, useEffect } from "react";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const useResource = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await sleep(1000);
      const response = await fetch("index.php/" + url);
      const json = await response.json();
      setData(json);
    };

    fetchData().catch(console.error);
  }, [url]);

  return data;
};
