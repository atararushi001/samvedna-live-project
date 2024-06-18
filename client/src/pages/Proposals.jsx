import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserStore from "../stores/UserStore";

import ProposalCard from "./components/ProposalCard";

const API = import.meta.env.VITE_API_URL;

const Proposals = () => {
  const [proposalTypes, setProposalTypes] = useState("Received");
  const [users, setUsers] = useState([]);

  const { loginState, userDetails } = UserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState) {
      navigate("/matrimony-login");
      return;
    }

    const getAllUserRequests = async () => {
      try {
        const response = await fetch(`${API}/request/get-all`, {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getPendingRequests = async () => {
      try {
        const response = await fetch(`${API}/request/pending`, {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAcceptedRequests = async () => {
      try {
        const response = await fetch(`${API}/request/accepted`, {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getRejectedRequests = async () => {
      try {
        const response = await fetch(`${API}/request/rejected`, {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAcceptedByOthers = async () => {
      try {
        const response = await fetch(`${API}/request/accepted-others`, {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getRejectedByOthers = async () => {
      try {
        const response = await fetch(`${API}/request/rejected-others`, {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    switch (proposalTypes) {
      case "Received":
        getAllUserRequests();
        break;
      case "Sent":
        getPendingRequests();
        break;
      case "Rejected By Me":
        getRejectedRequests();
        break;
      case "Rejected By Others":
        getRejectedByOthers();
        break;
      case "Accepted By Me":
        getAcceptedRequests();
        break;
      case "Accepted By Others":
        getAcceptedByOthers();
        break;
      default:
        break;
    }

    console.log(users);
  }, [navigate, loginState, userDetails, proposalTypes]);

  const handleFilterChange = (event) => {
    setProposalTypes(event.target.value);
    console.log(users);
  };

  return (
    <div className="container">
      <section className="proposals-section">
        <h1>
          Proposals <span className="highlight-text">({proposalTypes})</span>
        </h1>
        <div className="actions">
          <select
            name="proposalTypes"
            id="proposalTypes"
            value={proposalTypes}
            onChange={handleFilterChange}
          >
            <option value="Received">Received</option>
            <option value="Sent">Sent</option>
            <option value="Rejected By Me">Rejected By Me</option>
            <option value="Rejected By Others">Rejected By Other</option>
            <option value="Accepted By Me">Accepted By Me</option>
            <option value="Accepted By Others">Accepted By Other</option>
          </select>
        </div>
        <div className="proposals">
          {users && users.length > 0 ? (
            users.map((user) => (
              <ProposalCard
                key={user._id}
                user={user.receiver}
                request={user}
                type={proposalTypes}
              />
            ))
          ) : (
            <p>No proposals found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Proposals;
