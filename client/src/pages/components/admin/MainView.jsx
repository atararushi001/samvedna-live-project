import { useState, useEffect } from "react";

import UserStore from "../../../stores/UserStore";

const API = import.meta.env.VITE_API_URL;

const MainView = () => {
  const [usersCount, setUsersCount] = useState({});
  const { userDetails } = UserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API}/admin/users-count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userDetails.token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsersCount(data);
      } else {
        console.error("An error occurred while fetching users count");
      }
    };

    fetchUsers();
  }, [userDetails]);

  return (
    <div className="main-view-container">
      <h1>Users</h1>
      <div className="cards">
        <div className="card">
          <h2>Recruiters</h2>
          <p>{usersCount.recruiters}</p>
        </div>
        <div className="card">
          <h2>Job Seekers</h2>
          <p>{usersCount.jobSeekers}</p>
        </div>
        <div className="card">
          <h2>Self Employed</h2>
          <p>{usersCount.selfEmployed}</p>
        </div>
        <div className="card">
          <h2>Matrimony Users</h2>
          <p>{usersCount.matrimonyUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default MainView;
