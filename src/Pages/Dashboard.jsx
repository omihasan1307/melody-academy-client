import React from "react";
import useUsers from "../hooks/useUsers";

const Dashboard = () => {
  const [user, refetch] = useUsers();
  console.log(user);
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
