import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserStore from "../stores/UserStore";

import ProfileCard from "./components/ProfileCard";

const API = import.meta.env.VITE_API_URL;

const Explore = () => {
  const [users, setUsers] = useState([]);
  const { loginState, userDetails } = UserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState) {
      navigate("/matrimony-login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API}/matrimony/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userDetails.token,
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [navigate, loginState, userDetails]);

  return (
    <div className="container">
      <section className="proposals-section">
        <h1>Explore</h1>
        <div className="proposals">
          {users.length > 0 ? (
            users.map((user) => <ProfileCard key={user._id} user={user} />)
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
