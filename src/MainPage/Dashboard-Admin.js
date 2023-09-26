function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log(user);
  return user;
  // return "Employee";
}

function Dashboard() {
  const user = getUser();
  return (
    <>
      <div>
        <h3>Hello {user?.name}</h3>
      </div>
    </>
  );
}

export default Dashboard;
