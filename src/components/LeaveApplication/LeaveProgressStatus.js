import { Timeline } from "rsuite";
import { Loader } from "rsuite";

import moment from "moment";

import { useResource } from "../../Common/useResource";

function LeaveProgressStatus(props) {
  const data = useResource("leave/progress/" + props.leave_id);

  if (data === null || data === "No data") {
    return (
      <Loader
        style={{ padding: "20px" }}
        size="md"
        content="Loading..."
        vertical
      />
    );
  }
  return (
    <>
      <Timeline className="custom-timeline" isItemActive={Timeline.ACTIVE_LAST}>
        {data.map((option) => (
          <Timeline.Item
            key="{option.updated_date}"
            time={moment(new Date(option.updated_date).toDateString()).format(
              "DD MMM"
            )}
          >
            {option.status}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}

export default LeaveProgressStatus;
