import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
// Importing toastify module
import { ToastContainer, toast } from "react-toastify";

const UseToast = (props) => {
  console.log(props);
  console.log("toast");

  useEffect(() => {
    if (props.open === undefined) {
      return;
    }
    if (props.open?.status === "Failed") {
      toast.error(props.open.message);
    } else {
      toast.success(props.open.message);
    }
  }, [props]);

  return (
    <>
      <div>
        <ToastContainer autoClose={5000} />
      </div>
    </>
  );
};

export default UseToast;
