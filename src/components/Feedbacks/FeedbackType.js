import FeatureRequest from "./FeatureRequest";
import BugReport from "./BugReport";
import Inquiry from "./Inquiry";
import Review from "./Review";
import OthersFeedback from "./OthersFeedback";

function getToken() {
  const tokenString = sessionStorage.getItem("user");
  const userToken = JSON.parse(tokenString);
  console.log(userToken);
  return userToken;
}

function FeedbackType(props) {
  const user = getToken();
  if (props.option === "Feature Request") {
    return (
      <>
        <FeatureRequest user={user}></FeatureRequest>
      </>
    );
  } else if (props.option === "Bug Report") {
    return (
      <>
        <BugReport user={user}></BugReport>
      </>
    );
  } else if (props.option === "Inquiry") {
    return (
      <>
        <Inquiry user={user}></Inquiry>
      </>
    );
  } else if (props.option === "Reviews") {
    return (
      <>
        <Review user={user}></Review>
      </>
    );
  } else if (props.option === "Others") {
    return (
      <>
        <OthersFeedback user={user}></OthersFeedback>
      </>
    );
  }
  return <></>;
}

export default FeedbackType;
