import React, { useState, useEffect } from "react";
import Tabs from "../../UI/Tabs";
import "./Feedback.css";
import FeedbackStatus from "./FeedbackStatus";

function AllFeedbacks() {
  return (
    <div className="card card-outline card-primary">
      <div className="all_feedbacks">
        <h1>All Feedbacks</h1>
        <Tabs>
          <div label="Unread">
            <FeedbackStatus status={false}></FeedbackStatus>
          </div>
          <div label="Read">
            <FeedbackStatus status={true}></FeedbackStatus>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default AllFeedbacks;
