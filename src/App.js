// // Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideBar";
import Login from "./components/Login/LoginForm";
import UseToast from "./UI/UseToast";

function setToken(userToken) {
  console.log("set token", userToken.token);
  sessionStorage.setItem("token", JSON.stringify(userToken.token));
  sessionStorage.setItem("user", JSON.stringify(userToken.user));
  window.location.reload(true);
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const token = getToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <div className="app">
        <section>
          <Header></Header>
        </section>

        <section className="sidebar">
          <SideBar></SideBar>
        </section>

        <section className="content">
          <div>
            <main>
              <Outlet></Outlet>
            </main>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
