import React, { useState, useEffect } from "react";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const useSendResource = (url, reqMethod, allInputValue) => {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:8080/" + url, {
        mode: "no-cors",
        method: reqMethod,
        body: JSON.stringify(allInputValue),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMsg(data);
        })
        .catch((err) => {
          setMsg(err);
        });
    };
  }, [url, reqMethod, allInputValue]);

  return msg;
};
