import { useResource } from "../../Common/useResource";
import { Loader } from "rsuite";
import { BiStop } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user?.user_id;
}

function UpcomingLeaveHoliday() {
  const user = getUser();
  const data = useResource("leave/upcomingHoliday/" + user);
  if (data === null) {
    return (
      <div className="card upcoming-leave-card">
        <div className="card-body">
          <h3>UpcomingLeaveHoliday</h3>
          <Loader backdrop size="md" content="Loading..." vertical />
        </div>
      </div>
    );
  } else if (data === "No data") {
    return (
      <div style={{ textAlign: "center", paddingBottom: "30px" }}>
        <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
          No Upcoming Holiday
        </div>
        <div>You can start to plan for your holiday.</div>
      </div>
    );
  }
  return (
    <>
      <div className="card upcoming-leave-card">
        <div className="card-body">
          <h3>
            Upcoming Holiday{" "}
            <span style={{ color: "gray", fontSize: "14px" }}>20 days</span>
          </h3>

          <br></br>
          {data.map((option) => (
            <div>
              <div className="row upcoming-box">
                <div className="col-1 text-end" style={{ alignItems: "end" }}>
                  <FaCircle size={"15px"} fill={option.type_color} />
                </div>
                <div className="col-11">
                  <div className="row upcoming-box">
                    <div className="col-6">{option.title}</div>

                    <div
                      className="col-4"
                      style={{
                        backgroundColor: option.status_color,
                        textAlign: "center",
                      }}
                    >
                      {option.status}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {option.amount === 1 ? (
                        <div className="col date-text">{option.start}</div>
                      ) : (
                        <div className="col date-text">
                          {option.start} - {option.end}
                        </div>
                      )}
                    </div>
                    <div className="col amount-text">
                      {option.amount} day(s)
                    </div>
                  </div>
                </div>
              </div>

              <br></br>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UpcomingLeaveHoliday;
