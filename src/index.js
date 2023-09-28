import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "rsuite/dist/rsuite.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

import App from "./App";
import Home from "./components/Home";
import Testing from "./components/Testing";
import AllEmployee from "./components/Employee/AllEmployee";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
import ErrorPage from "./components/ErrorPage";
import MainDepartment from "./components/Departments/MainDepartment";
import DepartmentDetails from "./components/Departments/DepartmentDetails";
import NewEmployee from "./components/Employee/NewEmployee";
import LeaveRequest from "./components/LeaveApplication/LeaveRequest";
import NewFeedback from "./components/Feedbacks/NewFeedback";
import Toast from "./UI/UseToast";
import AllFeedbacks from "./components/Feedbacks/AllFeedbacks";
import ManageLeaveMainPage from "./components/LeaveApplication/manager-leave/ManageLeaveMainPage";
import ModalUi from "./UI/Modal";
import LeaveProgressStatus from "./components/LeaveApplication/LeaveProgressStatus";
import MyLeaveMainPage from "./components/LeaveApplication/MyLeaveMainPage";
import ReportMainPage from "./components/Reports/ReportMainPage";
import LoginForm from "./components/Login/LoginForm";
import UserProfile from "./components/UserProfile/UserProfile";
import MainFeedbackUser from "./components/Feedbacks/MainFeedbackUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/justapply",
        element: <Home />,
      },
      { path: "/login", element: <LoginForm /> },
      { path: "/employee", element: <AllEmployee /> },
      { path: "/employee/:user_id", element: <EmployeeDetails /> },
      { path: "/user_profile/:user_id", element: <UserProfile /> },
      { path: "/employee/new_employee", element: <NewEmployee /> },
      { path: "/department", element: <MainDepartment /> },
      { path: "/department/:id", element: <DepartmentDetails /> },
      { path: "/my_leave/leave_request", element: <LeaveRequest /> },
      { path: "/leave_progress_status", element: <LeaveProgressStatus /> },
      { path: "/my_leave", element: <MyLeaveMainPage /> },
      { path: "/all_leave", element: <ManageLeaveMainPage /> },
      { path: "/my_feedback/new", element: <NewFeedback /> },
      { path: "/my_feedback", element: <MainFeedbackUser /> },
      { path: "/all_feedbacks", element: <AllFeedbacks /> },
      { path: "/all_reports", element: <ReportMainPage /> },
      { path: "/modal", element: <ModalUi /> },

      // { path: "/toast", element: <Toast /> },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
