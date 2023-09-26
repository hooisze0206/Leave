import DataTable from "react-data-table-component";
import React, { useState, useEffect, useRef } from "react";
import { Loader, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";

import { useResource } from "../../Common/useResource";
import { useList } from "../../Common/useList";
import Button from "../../UI/Button";
import AllFeedbackUser from "./AllFeedbackUser";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
  // return "Employee";
}

function MainFeedbackUser() {
  const navigate = useNavigate();

  return (
    <>
      <AllFeedbackUser></AllFeedbackUser>
    </>
  );
}

export default MainFeedbackUser;
