import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useResource } from "../../Common/useResource";
import React, { useState, useCallback } from "react";
import NewLeave from "./NewLeave";

import "./leave.css";

const localizer = momentLocalizer(moment);

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
}

function MyCalendar(props) {
  const user = getUser();
  const holidays = useResource("/leave/myHoliday/" + user);
  console.log(holidays);

  const leave_info = useResource("/utility/leave_information/" + user);
  console.log(leave_info);

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  if (holidays === null || leave_info === null) {
    return;
  }

  const openModal = () => {
    setShowModal(true);
  };
  var handleClose = () => setShowModal(false);

  var handleSuccess = () => {
    console.log("success");
  };

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleSelectedEvent = (info) => {
    console.log(info);
  };

  const handleSelectedDates = (info) => {
    // disable click past date
    if (new Date(info.start) < new Date()) {
      alert("Please do not click past date.");
      return;
    }

    if (leave_info)
      // if (date === new Date(info.start).toLocaleDateString("en-CA")) {
      //   alert("This is public holiday");
      //   return;
      // }
      console.log(info.slots[info.slots.length - 1]);

    const newEvent = {
      start: info.start,
      end: info.slots[info.slots.length - 1],
    };
    const data = newEvent;
    setData(data);
    openModal();
  };

  const eventPropGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "#EEFAFB",
      color: "black",
      borderRadius: "5px",
      border: "lightblue",
      borderStyle: "solid",
    };

    if (event.type === "1") {
      newStyle.backgroundColor = "#E2F4E8";
      newStyle.border = "#A6DDB9";
    }

    return {
      className: "",
      style: newStyle,
    };
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4>My Calendar</h4>
        <p style={{ color: "grey", padding: "10px", fontSize: "14px" }}>
          * You can drag your mouse over the dates in the calendar to request
          leave
        </p>

        <Calendar
          selectable={true}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          dateClick={handleDateClick}
          eventClick={(event) => {
            console.log(event.event._def.publicId);
          }}
          eventPropGetter={eventPropGetter}
          events={holidays}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          views={["month", "agenda"]}
          onSelectEvent={(event) => handleSelectedEvent(event)}
          onSelectSlot={(event) => handleSelectedDates(event)}
        />
      </div>

      <NewLeave
        show={showModal}
        hide={handleClose}
        success={handleSuccess}
        data={data}
        info={leave_info}
      />
    </div>
  );
}

export default MyCalendar;
