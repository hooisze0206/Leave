import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="all">
      <div className="centered">
        <div className="spinner loading">
          <p className="loading-text">Loading..</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
